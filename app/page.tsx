"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import CharacterManagement, {
  Character,
} from "@/components/CharacterManagement";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const { messages, append, isLoading, input, handleInputChange } = useChat();

  const handleCharactersChange = (newCharacters: Character[]) => {
    setCharacters(newCharacters);
  };

  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Story Telling App</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Customize the story based on your own characters.
            </p>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <CharacterManagement onCharactersChange={handleCharactersChange} />

            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={
                    m.role === "user" ? "hidden text-right" : "text-left"
                  }
                >
                  <span className="bg-gray-800 text-gray-100 rounded px-2 py-1 inline-block my-1">
                    {m.content}
                  </span>
                </div>
              ))}

              {isLoading && (
                <p className="animate-pulse text-center">Generating...</p>
              )}
            </div>

            <div className="p-4 flex gap-4 items-center justify-between">
              <Input
                className="w-full p-2 border rounded"
                value={input}
                onChange={handleInputChange}
                placeholder="Tell me a story..."
              />
              <Button
                variant="secondary"
                disabled={isLoading}
                onClick={() => {
                  const characterPrompt =
                    characters.length > 0
                      ? `Use the following characters in the story:\n${characters
                          .map(
                            (char) =>
                              `- ${char.name}: ${char.description}. Personality: ${char.personality}`
                          )
                          .join("\n")}\n\n`
                      : "";
                  const fullPrompt = `${characterPrompt}${input}`;
                  append({
                    role: "user",
                    content: `${fullPrompt}\n\nAt the end, provide a brief summary of each character's role.`,
                  });
                }}
              >
                Generate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
