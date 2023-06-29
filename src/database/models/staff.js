import { DataTypes, Model } from 'sequelize'

export default function (sequelize) {
  class Staff extends Model {
    static associate(models) {
      Staff.belongsTo(models.user, { foreignKey: 'userId' })
    }
  }

  Staff.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      staff: {
        type: DataTypes.STRING(140),
        allowNull: false
      }
    },
    {
      modelName: 'staff',
      sequelize
    }
  )

  return Staff
}
