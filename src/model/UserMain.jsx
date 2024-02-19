export default class UserMain {
  constructor(data) {
    this._id = data.id;
    this._firstName = data.userInfos.firstName;
    this._keyData = data.keyData;
    this._todayScore = data.score || data.todayScore;
  }
  get id() {
    return this._id;
  }
  get firstName() {
    return this._firstName;
  }
  get keyData() {
    return {
      calorieCount: this._keyData.calorieCount,
      proteinCount: this._keyData.proteinCount,
      carbohydrateCount: this._keyData.carbohydrateCount,
      lipidCount: this._keyData.lipidCount
    };
  }
  get todayScore() {
    return [{
      score: this._todayScore * 100,
      fill: '#FF0000'
    }]
  }
}
