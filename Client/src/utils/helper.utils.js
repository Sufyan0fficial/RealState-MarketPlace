export const alert = (messageApi,type,content) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };