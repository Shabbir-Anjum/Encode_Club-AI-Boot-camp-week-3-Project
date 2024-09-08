import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Plus } from "lucide-react";

export interface Character {
  name: string;
  description: string;
  personality: string;
}

interface CharacterManagementProps {
  onCharactersChange: (characters: Character[]) => void;
}

const defaultCharacters: Character[] = [
  {
    name: "Alice",
    description: "A curious and adventurous young girl",
    personality: "Imaginative and brave",
  },
  {
    name: "Bob",
    description: "A skilled detective with a sharp mind",
    personality: "Analytical and persistent",
  },
  {
    name: "Charlie",
    description: "A charismatic leader with a mysterious past",
    personality: "Confident and secretive",
  },
];

const CharacterManagement: React.FC<CharacterManagementProps> = ({
  onCharactersChange,
}) => {
  const [characters, setCharacters] = useState<Character[]>(defaultCharacters);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState<Character>({
    name: "",
    description: "",
    personality: "",
  });
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    onCharactersChange(characters);
  }, [characters, onCharactersChange]);

  const openDialog = (character?: Character | null, index = -1) => {
    setCurrentCharacter(
      character || { name: "", description: "", personality: "" }
    );
    setEditIndex(index);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setCurrentCharacter({ name: "", description: "", personality: "" });
    setEditIndex(-1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentCharacter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (editIndex === -1) {
      setCharacters((prev) => [...prev, currentCharacter]);
    } else {
      setCharacters((prev) =>
        prev.map((char, idx) => (idx === editIndex ? currentCharacter : char))
      );
    }
    closeDialog();
  };

  const handleDelete = (index: number) => {
    setCharacters((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className="p-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => openDialog()} className="mb-4">
            <Plus className="mr-2 h-4 w-4" /> Add Character
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editIndex === -1 ? "Add" : "Edit"} Character
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              name="name"
              value={currentCharacter.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <Input
              name="description"
              value={currentCharacter.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
            <Input
              name="personality"
              value={currentCharacter.personality}
              onChange={handleInputChange}
              placeholder="Personality"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button onClick={closeDialog} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Personality</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {characters.map((character, index) => (
            <TableRow key={index}>
              <TableCell>{character.name}</TableCell>
              <TableCell>{character.description}</TableCell>
              <TableCell>{character.personality}</TableCell>
              <TableCell>
                <Button
                  onClick={() => openDialog(character, index)}
                  variant="ghost"
                  size="sm"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleDelete(index)}
                  variant="ghost"
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CharacterManagement;
