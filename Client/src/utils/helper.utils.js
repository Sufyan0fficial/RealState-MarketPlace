export const alert = (messageApi,type,content) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };


export const isValidURL = (str)=>{
  try {
    new URL (str)
    return true
  } catch (error) {
    return false
  }
}