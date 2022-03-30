const { response } = require('express');

const isAdminRoleMw = (req, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: 'Se quiere verificar el role sin validar el token primero',
    });
  }

  const { rol, nombre } = req.usuario;

  if (rol !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${nombre} no es administrador - No puede hacer esto`,
    });
  }

  return next();
};

const hasRoleMw = (...roles) => (req, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: 'Se quiere verificar el role sin validar el token primero',
    });
  }

  if (!roles.includes(req.usuario.rol)) {
    return res.status(401).json({
      msg: `El servicio requiere uno de estos roles ${roles}`,
    });
  }

  return next();
};

module.exports = {
  isAdminRoleMw,
  hasRoleMw,
};
