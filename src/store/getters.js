const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  agencyId: state => state.user.agencyId,
  agencyName: state => state.user.agencyName,
  role: state => state.user.role,
  permissions: state => state.user.permissions
}
export default getters
