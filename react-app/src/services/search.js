export const searchUsers = async(searchTerm) => {
    const response = await fetch(`/api/search/${searchTerm}`);
    return await response.json();
  }