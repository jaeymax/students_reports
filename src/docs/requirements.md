

I'm trying to create a students reports generator to automate the process of generating students reports by teachers


the report card to be generated has 11 rows and 7 columns

the columns are as follows the follows
1. Indicates the subject for the report

2. indicates the students class score(50%)

3. Indicates the students exams score(50%)

4. Indicates the total score which is the sum of the exams score and the class score (100%) this field should be auto generated when the class score and exam score are filled

5. Indicates the grade of the student 
80 - 90 represents 1
75 - 80 represents 2
70 - 74 represents 3
65 - 69 represents 4
60 - 65 represents 5
50 - 59 represents 6
40 - 49 represents 7
30 - 39 represents 8
0 - 29 represents 9
This field should also be auto filled when the based on the total score

6. Represents the position of the student in that particular subject you can leave this blank
for now as it would be calculated relative to other student's score

7. Represents the class teachers remark
this should be auto filed based on the students grade
grade 1 indicates Excellent
grade 2 indicates Very Good
grade 3 indicates Good
grade 4 indicates Credit
grade 5 indicates Pass
grade 6 indicates Pass
grade 7 indicates Pass
grade 8 indicates Pass
grade 9 indicates Fail



Now a row represents a record for a particular subject
row 1 subject is ENGLISH LANGUAGE
ROW 2 SUBJECT IS MATHEMATICS
ROW 3 SUBJECT IS SOCIAL STUDIED
ROW 4 SUBJECT IS RELIGIOUS AND MORAL
ROW 5 SUBJECT IS FRENCH
ROW 6 SUBJECT IS CREATIVE ARTS
ROW 7 SUBJECT IS GHANAIAN LANGUAGE
ROW 8 SUBJECT IS CAREER TECHNOLOGY

Note that all auto generated fields should be not inputtable (a teacher should not be able to edit this field because is already calculated for them)