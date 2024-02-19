export default class UserActivity {
  constructor(data) {
    this._userId = data.userId;
    this._sessions = data.sessions.map((session) => ({
      day: convertDay(session.day),
      kilogram: session.kilogram,
      calories: session.calories,
    }));
  }

  get userId() {
    return this._userId;
  }
  get sessions() {
    return this._sessions;
  }
}
  function convertDay() {
    const daysMap = ['1', '2', '3', '4', '5', '6', '7']
    return daysMap
}