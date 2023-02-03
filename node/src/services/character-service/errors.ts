import { ApplicationError } from "@/protocols";

export function cannotCreateCharacter(): ApplicationError {
  return {
    name: "CannotCreateCharacter",
    message: "You already have an alive character!",
  };
}

export function cannotUpdateCharacter(): ApplicationError {
  return {
    name: "CannotUpdateCharacter",
    message: "You have no alive character!",
  };
}

export function cannotFindItem(): ApplicationError {
  return {
    name: "CannotFindItem",
    message: "There is no item with given itemId!",
  };
}