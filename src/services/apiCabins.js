import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Error fetching cabins");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Error deleting cabin");
  }

  return data;
}

export async function createEditCabin(newCabin, id, currentImage) {
  const hasImagePath = Boolean(typeof newCabin.image === "string");
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Create a query to insert a new cabin or update an existing one
  let query = supabase.from("cabins");

  // If no id is provided, insert a new cabin
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // If an id is provided, update the existing cabin
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Error creating cabin");
  }

  // Update Photo or Insert new photo

  if (hasImagePath) {
    return data;
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    deleteCabin(data.id, currentImage);

    console.error(storageError);
    throw new Error("Error uploading image and cabin could not be created");
  }

  if (currentImage) {
    await supabase.storage.from("cabin-images").remove([currentImage]);
  }
  return data;
}
