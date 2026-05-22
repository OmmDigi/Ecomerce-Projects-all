"use client";

export default function Description({ description }: { description: string }) {
  return (
    <div
      className="prose max-w-none w-full"
      dangerouslySetInnerHTML={{ __html: description }}
    ></div>
  );
}
