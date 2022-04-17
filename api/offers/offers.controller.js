const { uploadToCloudinaryAndCleanTemp } = require('../../helpers/cloudinaryActions');
const {
  getAllOffers,
  getOneOffer,
  createOffer,
  updateOffer,
  deleteOffer,
} = require('./offers.service');

const handlerGetAllOffers = async (req, res) => {
  const { limit = 5, page = 1 } = req.query;
  try {
    const offers = await getAllOffers(limit, page);

    return res.json(offers);
  } catch (error) {
    return res.status(500).json({ msg: 'Error getting offers' });
  }
};

const handlerGetOneOffer = async (req, res) => {
  const { id } = req.params;

  try {
    const offer = await getOneOffer(id);

    return res.json(offer);
  } catch (error) {
    return res.status(500).json({ msg: 'Error getting offer' });
  }
};

const handlerCreateOffer = async (req, res) => {
  const { _id, __v, state, createdAt, updateAt, ...rest } = req.body;

  try {
    const offer = await createOffer(rest);

    return res.status(201).json(offer);
  } catch (error) {
    return res.status(500).json({ msg: 'Error creating offer' });
  }
};

const handlerUpdateOffer = async (req, res) => {
  const { id } = req.params;
  const { _id, __v, state, createdAt, updateAt, ...rest } = req.body;

  try {
    if (req.file) {
      const secureUrl = await uploadToCloudinaryAndCleanTemp(req.file.path, 'offers');
      rest.photo = secureUrl;
    }

    const offer = await updateOffer(id, rest);
    return res.json(offer);
  } catch (error) {
    return res.status(500).json({ msg: 'Error updating offer' });
  }
};

const handlerDeleteOffer = async (req, res) => {
  const { id } = req.params;

  try {
    const offer = await deleteOffer(id);

    return res.status(204).json({
      msg: `Offer ${offer.name} was deleted`,
    });
  } catch (error) {
    return res.status(500).json({ msg: 'Error deleting offer' });
  }
};

module.exports = {
  handlerGetAllOffers,
  handlerGetOneOffer,
  handlerCreateOffer,
  handlerUpdateOffer,
  handlerDeleteOffer,
};
