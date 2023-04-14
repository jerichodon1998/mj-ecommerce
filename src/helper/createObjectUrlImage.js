export const createObjectUrlImage = (blobParts) => {
	const blob = new Blob([blobParts], { type: "image/jpeg" });
	//static method creates a string containing a URL representing the object given in the parameter.
	const objURL = URL.createObjectURL(blob);
	return objURL;
};
