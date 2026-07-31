export default function useAutoCheckLead() {
  const todayD = new Date().getTime();
  const msPerSecond = 1000;
  const msPerMinute = msPerSecond * 60;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;

  const checkDaysPassed = (lastC: Date | string) => {
    const last = new Date(lastC).getTime();
    const timeDiff = todayD - last;

    const days = timeDiff / msPerDay;

    return days;
  };
  return { checkDaysPassed };
}
