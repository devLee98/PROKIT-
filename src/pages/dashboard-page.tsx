import DailyStudyTime from '../components/dashboard/daily-study-time';
import StudyRecord from '../components/dashboard/study-record';
import StudyTimeSea from '../components/dashboard/study-time-sea';
import Studybox from '../components/dashboard/studybox';

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto flex h-[1550px] w-[1200px] flex-col">
        <div className="mt-10 flex gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Studybox title="누적공부시간" number={0} />
            <Studybox title="누적공부일수" number={0} />
            <Studybox title="하루 평균 공부 시간" number={0} />
            <Studybox title="목표 달성률" number={0} />
          </div>
          <DailyStudyTime />
        </div>
        <StudyTimeSea />
        <StudyRecord />
      </div>
    </div>
  );
}
