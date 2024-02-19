export default class UserAverageSessions {
  constructor(data) {
    this._userId = data.userId;
    this._sessions = data.sessions.map((session) => ({
      day: convertDay(session.day),
      sessionLength: session.sessionLength,
    }));
  }

  get userId() {
    return this._userId;
  }
  get sessions() {
    return this._sessions;
  }
}

function convertDay(dayNumber) {
  const daysMap = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  return daysMap[dayNumber - 1] || '';
}
