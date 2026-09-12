"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import {
  makeCustomNpcId,
  readCustomNpcs,
  writeCustomNpcs,
  type CustomNpc,
} from "@/lib/useless-storage";
import { DossierFlipCard } from "./character-card";

type CustomNpcCreatorProps = {
  onCreated: (customNpc: CustomNpc) => void;
};

const transparentCard =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 768 1419'%3E%3Crect width='768' height='1419' fill='%23f1f4f2'/%3E%3Cpath d='M50 132h668M50 210h668M50 288h668M50 366h668M50 444h668M50 522h668M50 600h668M50 678h668M50 756h668M50 834h668M50 912h668M50 990h668M50 1068h668M50 1146h668M50 1224h668' stroke='%239aa3a2' stroke-width='4' opacity='.38'/%3E%3Crect x='42' y='124' width='684' height='420' fill='%23d91532' opacity='.88'/%3E%3Ctext x='384' y='710' text-anchor='middle' font-family='Arial Black,Arial' font-size='54' fill='%23080a0b'%3ECUSTOM NPC%3C/text%3E%3Ctext x='384' y='796' text-anchor='middle' font-family='monospace' font-size='34' fill='%2358666a'%3EIMAGE PENDING%3C/text%3E%3C/svg%3E";

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => resolve(String(reader.result)));
    reader.addEventListener("error", () => reject(reader.error));
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
  const [message, setMessage] = useState("");

  async function handleImageChange(
    event: ChangeEvent<HTMLInputElement>,
    side: "front" | "back",
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const image = await readFileAsDataUrl(file);

    if (side === "front") {
      setFrontImage(image);
    } else {
      setBackImage(image);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !frontImage || !backImage) {
      setMessage("Name, front image, and back image are required.");
      return;
    }

    const customNpc: CustomNpc = {
      id: makeCustomNpcId(),
      name: name.trim(),
      frontImage,
      backImage,
      details: details.trim() || "Custom uselessness filed without comment.",
      backDetails:
        backDetails.trim() || "Backside dossier text intentionally withheld.",
      createdAt: Date.now(),
    };

    writeCustomNpcs([...readCustomNpcs(), customNpc]);
    onCreated(customNpc);
    setName("");
    setDetails("");
    setBackDetails("");
    setFrontImage("");
    setBackImage("");
    setMessage("Custom NPC filed into the archive.");
    setIsOpen(false);
  }

  if (!isOpen) {
    return (
      <article className="custom-npc-template">
        <p>Favourite NPC Creator</p>
        <button
          aria-label="Add custom favourite NPC"
          className="custom-npc-add"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          +
        </button>
        <h2>Add favourite NPC</h2>
        <span>{message || "Open a blank classified template."}</span>
      </article>
    );
  }

  return (
    <article className="custom-npc-form-card">
      <div className="dossier-section-copy">
        <p>Favourite NPC Creator</p>
        <h2>New useless entry</h2>
        <span>Upload both sides, inspect the tragedy, then save it.</span>
      </div>

      <form className="custom-npc-form" onSubmit={handleSubmit}>
        <label>
          NPC name
          <input
            onChange={(event) => setName(event.target.value)}
            placeholder="Name filed under nonsense"
            required
            type="text"
            value={name}
          />
        </label>

        <label>
          Front card image
          <input
            accept="image/*"
            onChange={(event) => void handleImageChange(event, "front")}
            required
            type="file"
          />
        </label>

        <label>
          Supporting details
          <textarea
            onChange={(event) => setDetails(event.target.value)}
            placeholder="Why the archive is suddenly obsessed"
            rows={3}
            value={details}
          />
        </label>

        <label>
          Backside image
          <input
            accept="image/*"
            onChange={(event) => void handleImageChange(event, "back")}
            required
            type="file"
          />
        </label>

        <label>
          Backside details
          <textarea
            onChange={(event) => setBackDetails(event.target.value)}
            placeholder="Optional classified emotional evidence"
            rows={3}
            value={backDetails}
          />
        </label>

        <div className="custom-npc-form-actions">
          <button className="dossier-vote-button" type="submit">
            SAVE NPC
          </button>
          <button
            className="dossier-return-button"
            onClick={() => setIsOpen(false)}
            type="button"
          >
            CANCEL
          </button>
        </div>
      </form>

      <DossierFlipCard
        backDetails={backDetails || "Backside dossier preview pending."}
        backImage={backImage || transparentCard}
        candidateId="custom-preview"
        chooseLabel="PREVIEW"
        details={details || "Frontside dossier preview pending."}
        frontImage={frontImage || transparentCard}
        hasVoted
        name={name || "Custom NPC"}
        onVote={() => undefined}
        previewOnly
        selectedImage={frontImage || transparentCard}
        voteCount={0}
      />

      {message ? <p className="custom-npc-message">{message}</p> : null}
    </article>
  );
}
