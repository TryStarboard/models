import * as Sequelize from 'sequelize';
import createUserModel, {UserAttributes, UserInstance} from './createUserModel';
import createRepoModel, {RepoAttributes, RepoInstance} from './createRepoModel';
import createTagModel, {TagAttributes, TagInstance} from './createTagModel';
import createRepoTagModel, {RepoTagAttributes, RepoTagInstance} from './createRepoTagModel';

export default function (sequelize: Sequelize.Connection) {
  const User = createUserModel(sequelize);
  const Repo = createRepoModel(sequelize);
  const Tag = createTagModel(sequelize);
  const RepoTag = createRepoTagModel(sequelize);

  User.hasMany(Repo, {
    foreignKey: {
      allowNull: false
    }
  });
  Repo.belongsTo(User);

  User.hasMany(Tag, {
    foreignKey: {
      allowNull: false
    }
  });
  Tag.belongsTo(User);

  Repo.belongsToMany(Tag, {through: RepoTag});
  Tag.belongsToMany(Repo, {through: RepoTag});

  return {
    User,
    Repo,
    Tag,
    RepoTag,
    sequelize,
  };
}
