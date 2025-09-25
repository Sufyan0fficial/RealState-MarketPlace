export const success = (messageApi,type,content) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };