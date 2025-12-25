export default function StudyRecord() {
  return (
    <div className="mt-4 h-[948px] w-[1200px] bg-white p-6">
      <p>학습기록</p>
      <table className="w-full">
        <thead>
          <tr>
            <th>날짜</th>
            <th>목표</th>
            <th>공부시간</th>
            <th>할 일 갯수</th>
            <th>미완료 할 일</th>
            <th>달성률</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2025-01-01</td>
            <td>100</td>
            <td>100</td>
            <td>100</td>
            <td>100</td>
            <td>100</td>
            <td>100</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
