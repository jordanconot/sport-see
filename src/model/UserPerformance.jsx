export default class UserPerformance {
  constructor(data) {
    this._userId = data.userId;
    this._kind = data.kind;
    this._data = data.data;
  }
  get userId() {
    return this._userId;
  }
  get performanceData() {
    const kindTranslate = {
      cardio: 'Cardio',
      energy: 'Énergie',
      endurance: 'Endurance',
      strength: 'Force',
      speed: 'Vitesse',
      intensity: 'Intensité',
    };
    return this._data.map((performance) => ({
      value: performance.value,
      kind: kindTranslate[this._kind[performance.kind.toString()]],
    }));
  }
}
