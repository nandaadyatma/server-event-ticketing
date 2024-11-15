// import model Talents
const Talents = require("../../api/v1/talents/model");
const { checkingImage } = require("./images");

// import custom error
const { NotFoundError, BadRequestError } = require("../../errors");

const getAllTalents = async (req) => {
  const { keyword, role } = req.query;

  let condition = { organizer: req.user.organizer };

  if (keyword) {
    condition = { ...condition, name: { $regex: keyword, $options: "i" } };
  }

  if (role) {
    condition = { ...condition, role: { $regex: role, $options: "i" } };
  }

  console.log("condition");
  console.log(condition);

  const result = await Talents.find(condition)
    .populate({
      path: "image",
      select: "_id url",
    })
    .select("_id name role image");

  return result;
};

const createTalents = async (req) => {
  const { name, role, image } = req.body;

  await checkingImage(image);

  const check = await Talents.findOne({ name, organizer: req.user.organizer });

  if (check) throw new BadRequestError("Talent is exist");

  const result = await Talents.create({
    name,
    image,
    role,
    organizer: req.user.organizer,
  });

  return result;
};

const getOneTalent = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({
    _id: id,
    organizer: req.user.organizer,
  })
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name role image");

  if (!result) throw new NotFoundError(`There's no speaker with id: ${id}`);

  return result;
};

const updateTalents = async (req) => {
  const { id } = req.params;
  const { name, image, role } = req.body;

  // cari image dengan field image
  await checkingImage(image);

  // cari talents dengan field name dan id selain dari yang dikirim dari params
  const check = await Talents.findOne({
    name,
    _id: { $ne: id },
    organizer: req.user.organizer,
  });

  // apa bila check true / data talents sudah ada maka kita tampilkan error bad request dengan message pembicara nama duplikat
  if (check) throw new BadRequestError("Talent has already registered");

  const result = await Talents.findOneAndUpdate(
    { _id: id },
    { name, image, role, organizer: req.user.organizer },
    { new: true, runValidators: true }
  );

  // jika id result false / null maka akan menampilkan error `Tidak ada pembicara dengan id` yang dikirim client
  if (!result) throw new NotFoundError(`There's no speaker with id: ${id}`);

  return result;
};

const deleteTalents = async (req) => {
  const { id } = req.params;

  const check = await Talents.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!check) throw new NotFoundError(`There's no speaker with id: ${id}`);

  const result = await Talents.findByIdAndDelete(id);

  return result;
};

const checkingTalents = async (id) => {
  const result = await Talents.findOne({ _id: id });

  if (!result) throw new NotFoundError(`There's no speaker with id: ${id}`);

  return result;
};

module.exports = {
  getAllTalents,
  createTalents,
  getOneTalent,
  updateTalents,
  deleteTalents,
  checkingTalents,
};
