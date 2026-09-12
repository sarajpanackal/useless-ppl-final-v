"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  makeCustomNpcId,
  readCustomNpcs,
  writeCustomNpcs,
  type CustomNpc,
} from "@/lib/useless-storage";
import { DossierFlipCard } from "./character-card";
import { soundFx } from "@/lib/audio-effects";

type CustomNpcCreatorProps = {
  onCreated: (customNpc: CustomNpc) => void;
};

const placeholderCardFront =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 768 1180'%3E%3Crect width='768' height='1180' fill='%23181b20'/%3E%3Crect x='40' y='40' width='688' height='1100' rx='20' fill='%2322272e' stroke='%23343d46' stroke-width='4'/%3E%3Ctext x='384' y='540' text-anchor='middle' font-family='monospace' font-size='38' font-weight='bold' fill='%2318e5e2'%3EFRONT CARD IMAGE%3C/text%3E%3Ctext x='384' y='600' text-anchor='middle' font-family='monospace' font-size='22' fill='%238b949e'%3EUPLOAD PHOTO EVIDENCE%3C/text%3E%3C/svg%3E";

const placeholderCardBack =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 768 1180'%3E%3Crect width='768' height='1180' fill='%2314171a'/%3E%3Crect x='40' y='40' width='688' height='1100' rx='20' fill='%231e2329' stroke='%23e9183b' stroke-width='4' stroke-dasharray='12 12'/%3E%3Ctext x='384' y='540' text-anchor='middle' font-family='monospace' font-size='38' font-weight='bold' fill='%23e9183b'%3EBACK DOSSIER%3C/text%3E%3Ctext x='384' y='600' text-anchor='middle' font-family='monospace' font-size='22' fill='%238b949e'%3EUPLOAD CLASSIFIED BACK%3C/text%3E%3C/svg%3E";

// Optimize uploaded images via HTML5 Canvas to prevent localStorage QuotaExceededError
async function compressImageFile(file: File, maxDim = 800): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(String(e.target?.result));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Clean high-performance webp or jpeg
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = String(e.target?.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function CustomNpcCreator({ onCreated }: CustomNpcCreatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [backDetails, setBackDetails] = useState("");
  const [frontImage, setFrontImage] = useState("");
  const [backImage, setBackImage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

  async function handleImageChange(
    event: ChangeEvent<HTMLInputElement>,
    side: "front" | "back",
  ) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      const compressed = await compressImageFile(file);
      if (side === "front") {
        setFrontImage(compressed);
      } else {
        setBackImage(compressed);
      }
      soundFx.playClick();
    } catch {
      setMessage("Failed to process image file. Please try a standard JPG/PNG.");
    } finally {
      setIsProcessing(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      setMessage("Please give this forgotten character a name.");
      return;
    }

    if (!frontImage) {
      setMessage("A front badge image is required.");
      return;
    }

    const finalBackImage = backImage || frontImage;

    const customNpc: CustomNpc = {
      id: makeCustomNpcId(),
      name: name.trim(),
      frontImage,
      backImage: finalBackImage,
      details: details.trim() || "Observed from the edge of the script.",
      backDetails:
        backDetails.trim() || "Classified reason: canon never gave them protagonist care.",
      createdAt: Date.now(),
    };

    try {
      writeCustomNpcs([...readCustomNpcs(), customNpc]);
      onCreated(customNpc);
      soundFx.playVoteStamp();

      setName("");
      setDetails("");
      setBackDetails("");
      setFrontImage("");
      setBackImage("");
      setMessage("Custom NPC successfully declassified and added to grid!");
      setIsOpen(false);
    } catch {
      setMessage("Storage limit reached. Please clear some custom entries in the Leaderboard.");
    }
  }

  if (!isOpen) {
    return (
      <article className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-[#12151a]/60 p-8 text-center transition-all hover:border-cyan-400 hover:bg-[#12151a] min-h-[460px]">
        <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400 font-bold">
          CITIZEN DOSSIER INTAKE
        </span>
        <button
          type="button"
          onClick={() => {
            soundFx.playClick();
            setIsOpen(true);
          }}
          className="mt-6 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10 border-2 border-cyan-400 text-cyan-300 text-3xl font-light hover:scale-110 hover:bg-cyan-500 hover:text-black transition-all shadow-[0_0_20px_rgba(24,229,226,0.2)]"
          aria-label="Add custom favourite NPC"
        >
          +
        </button>
        <h2 className="mt-6 text-xl font-bold text-white tracking-tight">
          File a Forgotten NPC
        </h2>
        <p className="mt-2 max-w-xs text-xs font-mono text-stone-400">
          Upload any overlooked side character with front/back cards and introduce them to the canon archive.
        </p>
        {message && <span className="mt-4 font-mono text-xs text-emerald-400">{message}</span>}
      </article>
    );
  }

  return (
    <div className="col-span-full rounded-2xl border border-cyan-500/30 bg-[#101318] p-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-2">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400 font-bold">
            {"// NEW RECRUIT DOSSIER CREATION"}
          </span>
          <h2 className="text-2xl font-black text-white">Create Custom NPC</h2>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="font-mono text-xs text-stone-400 hover:text-white uppercase transition px-2 py-1 rounded bg-white/5"
        >
          ✕ Close Creator
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
        {/* Left: Input Form */}
        <form className="flex flex-col gap-4 font-mono text-xs" onSubmit={handleSubmit}>
          <div>
            <label className="block text-stone-300 uppercase font-bold mb-1.5">
              NPC Name *
            </label>
            <input
              className="w-full rounded-lg border border-white/15 bg-black/50 px-3.5 py-2.5 text-stone-100 placeholder:text-stone-600 focus:border-cyan-400 focus:outline-none"
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. The Cabbage Merchant"
              required
              type="text"
              value={name}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-300 uppercase font-bold mb-1.5">
                Front Card Image *
              </label>
              <input
                accept="image/*"
                className="w-full rounded-lg border border-white/15 bg-black/50 p-2 text-stone-300 file:mr-3 file:rounded file:border-0 file:bg-cyan-500 file:px-2.5 file:py-1 file:font-mono file:text-[11px] file:font-bold file:text-black cursor-pointer"
                onChange={(e) => void handleImageChange(e, "front")}
                required
                type="file"
              />
            </div>

            <div>
              <label className="block text-stone-300 uppercase font-bold mb-1.5">
                Back Dossier Image (Optional)
              </label>
              <input
                accept="image/*"
                className="w-full rounded-lg border border-white/15 bg-black/50 p-2 text-stone-300 file:mr-3 file:rounded file:border-0 file:bg-stone-700 file:px-2.5 file:py-1 file:font-mono file:text-[11px] file:font-bold file:text-stone-200 cursor-pointer"
                onChange={(e) => void handleImageChange(e, "back")}
                type="file"
              />
            </div>
          </div>

          <div>
            <label className="block text-stone-300 uppercase font-bold mb-1.5">
              Front Summary / Role
            </label>
            <textarea
              className="w-full rounded-lg border border-white/15 bg-black/50 px-3.5 py-2 text-stone-100 placeholder:text-stone-600 focus:border-cyan-400 focus:outline-none"
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Brief description of their overlooked role in the story."
              rows={2}
              value={details}
            />
          </div>

          <div>
            <label className="block text-stone-300 uppercase font-bold mb-1.5">
              Backside Canonical Neglect Dossier
            </label>
            <textarea
              className="w-full rounded-lg border border-white/15 bg-black/50 px-3.5 py-2 text-stone-100 placeholder:text-stone-600 focus:border-cyan-400 focus:outline-none"
              onChange={(e) => setBackDetails(e.target.value)}
              placeholder="Why canon neglected them, ignored their feelings, or treated them like furniture."
              rows={3}
              value={backDetails}
            />
          </div>

          {message && <p className="font-mono text-xs text-red-400 font-bold">{message}</p>}

          <div className="flex items-center gap-3 pt-2">
            <button
              className="flex-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 py-3 font-mono text-xs font-black uppercase tracking-widest text-black shadow-lg transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
              disabled={isProcessing}
              type="submit"
            >
              {isProcessing ? "PROCESSING PHOTO..." : "SAVE & DECLASSIFY NPC"}
            </button>
            <button
              className="rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 px-5 py-3 font-mono text-xs font-bold uppercase text-stone-300 transition"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Right: Live Interactive Flip Card Preview */}
        <div className="flex flex-col items-center">
          <div className="mb-2 text-center">
            <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400 font-bold">
              LIVE 3D CARD PREVIEW (CLICK TO TEST FLIP)
            </span>
          </div>
          <div className="w-full max-w-[280px]">
            <DossierFlipCard
              backDetails={backDetails || "Why canon didn't properly care about this character..."}
              backImage={backImage || frontImage || placeholderCardBack}
              candidateId="custom-preview"
              chooseLabel="PREVIEW"
              details={details || "Front role description..."}
              frontImage={frontImage || placeholderCardFront}
              hasVoted={false}
              name={name || "Unnamed NPC"}
              onVote={() => {}}
              previewOnly
              selectedImage={frontImage || placeholderCardFront}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
