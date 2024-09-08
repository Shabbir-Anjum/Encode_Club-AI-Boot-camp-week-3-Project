'use client'
import React, { useState } from "react";
import { useChat } from "ai/react";
import CharacterManagement, { Character } from "@/components/CharacterManagement";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StoryDisplay from "@/components/StoryDisplay";

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const { messages, append, isLoading, input, handleInputChange } = useChat();
  const [generatedStory, setGeneratedStory] = useState("");

  const handleCharactersChange = (newCharacters: Character[]) => {
    setCharacters(newCharacters);
  };

  const handleGenerateStory = () => {
    const characterPrompt =
      characters.length > 0
        ? `Use the following characters in the story:\n${characters
            .map(
              (char) =>
                `- ${char.name}: ${char.description}. Personality: ${char.personality}`
            )
            .join("\n")}\n\n`
        : "";
    const fullPrompt = `${characterPrompt}${input}\n\nPlease format the story as follows:
    1. Start with the title in bold (surrounded by **).
    2. Write the main story content.
    3. End with a "Summary of characters' roles" section.
    4. In the summary, list each character with an asterisk (*), their name, followed by a colon (:) and their role description.`;
    
    append({
      role: "user",
      content: fullPrompt,
    });
  };

  React.useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].role === "assistant") {
      setGeneratedStory(messages[messages.length - 1].content);
    }
  }, [messages]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-purple-300">Story Telling App</h1>
            <p className="text-lg text-gray-300">
              Customize the story based on your own characters.
            </p>
          </div>

          <div className="w-full max-w-4xl space-y-6 bg-gray-800 bg-opacity-50 rounded-lg p-6 shadow-xl">
            <CharacterManagement onCharactersChange={handleCharactersChange} />

            <div className="flex gap-4 items-center">
              <Input
                className="flex-grow bg-gray-700 text-white border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                value={input}
                onChange={handleInputChange}
                placeholder="Enter a story prompt..."
              />
              <Button
                variant="secondary"
                disabled={isLoading}
                onClick={handleGenerateStory}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Generate Story
              </Button>
            </div>

            {isLoading && (
              <p className="animate-pulse text-center text-gray-400">
                Generating story...
              </p>
            )}

            {generatedStory && <StoryDisplay story={generatedStory} />}
          </div>
        </div>
      </div>
    </main>
  );
}