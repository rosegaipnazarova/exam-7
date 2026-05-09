export class CreateAttendanceDto {
  studentId!: number;
  groupId!: number;
  status!: string; // 'present' yoki 'absent'
  date?: Date;
}