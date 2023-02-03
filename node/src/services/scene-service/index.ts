import sceneRepository from "@/repositories/scene-repository";

async function getAllScenes() {
  const scenes = await sceneRepository.findAllScenes();

  return scenes;
}

const sceneService = {
  getAllScenes,
};

export default sceneService;
