const captureHTML = async () => {
  const element = document.getElementById("captureElement");
  const canvas = await html2canvas(element);
  const image = canvas.toDataURL("image/png");
  const recipeName = State.receiveData.dishName;

  const link = document.createElement("a");
  link.href = image;
  link.download = `${recipeName}.png`;
  link.click();
  setUnshown(false);
};