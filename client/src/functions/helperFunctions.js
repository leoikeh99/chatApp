import moment from "moment";

const truncate = (value, length) => {
  return value.length < length ? value : value.substr(0, length - 1) + "...";
};

const getDays = (messages) => {
  let days = [];
  days.push({ id: messages[0]._id, date: messages[0].createdAt });
  for (let i = 1; i < messages.length; i++) {
    if (
      moment(messages[i].createdAt).format("dddd") !==
      moment(messages[i - 1].createdAt).format("dddd")
    ) {
      days.push({ id: messages[i]._id, date: messages[i].createdAt });
    }
  }

  return days;
};

const checkDate = (date) => {
  const convertDate = moment(date).format("LL");
  const today = moment().format("LL");
  const yesterday = moment().add(-1, "days").format("LL");

  if (convertDate === today) {
    return "Today";
  } else if (convertDate === yesterday) {
    return "Yesterday";
  } else {
    return convertDate;
  }
};

const getNewList = (list) => {
  var newList = [];

  if (list.length !== 0) {
    newList = [list[list.length - 1]];
  }

  for (let i = list.length - 1; i >= 0; i--) {
    let sender = list[i].sender;
    let reciever = list[i].reciever;
    let check = false;

    newList.forEach((element) => {
      if (
        (sender === element.sender && reciever === element.reciever) ||
        (sender === element.reciever && reciever === element.sender)
      ) {
        check = true;
      }
    });
    if (check === false) {
      newList.push(list[i]);
    }
  }
  return newList;
};

const arrange = (chatList, data) => {
  const list = chatList;
  var _id;
  for (let i = 0; i < list.length; i++) {
    if (
      (data.sender === list[i].sender && data.reciever === list[i].reciever) ||
      (data.sender === list[i].reciever && data.reciever === list[i].sender)
    ) {
      _id = list[i]._id;
      list.splice(i, 1);
    }
  }

  list.unshift(data);
  list[0]._id = _id;
  return list;
};

const getTime = (date) => {
  const convertDate = moment(date).format("L");
  const today = moment().format("L");
  const yesterday = moment().add(-1, "days").format("L");

  if (convertDate === today) {
    return moment(date).format("LT");
  } else if (convertDate === yesterday) {
    return "Yesterday";
  } else {
    return convertDate;
  }
};

const checkImageType = (type) => {
  let imageTypes = ["image/jpg", "image/jpeg", "image/png"];
  let check = false;
  imageTypes.forEach((imageType) => {
    type === imageType && (check = true);
  });
  return check;
};

export {
  truncate,
  getDays,
  checkDate,
  getNewList,
  arrange,
  getTime,
  checkImageType,
};
