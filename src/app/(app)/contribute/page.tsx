"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";

const FIELD =
  "w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-paper placeholder:text-faint focus:border-beacon-dim focus:outline-none";

const KINDS = [
  {
    value: "correction",
    label: "Something is wrong",
    hint: "A date, prerequisite or eligibility rule that does not match the official source.",
  },
  {
    value: "missing",
    label: "Something is missing",
    hint: "A programme or opportunity that is not in the catalogue yet.",
  },
  {
    value: "idea",
    label: "An idea",
    hint: "Anything that would make planning easier.",
  },
] as const;

export default function ContributePage() {
  const [kind, setKind] = useState<string>(KINDS[0].value);
  const [detail, setDetail] = useState("");
  const [source, setSource] = useState("");

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Keep it accurate"
        title="Contribute"
        description="Programme requirements change and pages move. If something here is out of date, telling us is the fastest way to fix it for everyone."
      />

      <form
        className="card flex flex-col gap-6 p-6 sm:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          // Wire this to your API.
        }}
      >
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-1 text-sm font-medium text-paper">
            What are you reporting?
          </legend>
          {KINDS.map((option) => (
            <label
              key={option.value}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                kind === option.value
                  ? "border-beacon-dim bg-nus/20"
                  : "border-line hover:border-line-strong"
              }`}
            >
              <input
                type="radio"
                name="kind"
                value={option.value}
                checked={kind === option.value}
                onChange={(e) => setKind(e.target.value)}
                className="mt-1 accent-beacon"
              />
              <span>
                <span className="block text-sm font-medium text-paper">
                  {option.label}
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  {option.hint}
                </span>
              </span>
            </label>
          ))}
        </fieldset>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-paper">Details</span>
          <textarea
            rows={5}
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="What did you find, and what should it say instead?"
            className={FIELD}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-paper">
            Link to the official page
          </span>
          <input
            className={FIELD}
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="https://"
          />
          <span className="text-xs text-faint">
            Optional, but it makes a correction much faster to verify.
          </span>
        </label>

        <div className="flex items-center gap-3 border-t border-line pt-5">
          <button
            type="submit"
            className="rounded-lg bg-nus px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-nus-lift"
          >
            Send report
          </button>
          <p className="text-xs text-faint">
            Nothing is submitted yet — this form is waiting on a backend.
          </p>
        </div>
      </form>
    </div>
  );
}
