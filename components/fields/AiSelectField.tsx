"use client";
import { GetForms } from "@/actions/form";
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { map, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import { RxDropdownMenu } from "react-icons/rx";
import React from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { toast } from "../ui/use-toast";
// import { Form as FormModel } from "@prisma/client";
async function getDescription(){

}
let mapi = new Map();
const type: ElementsType = "AiSelectField";
const arrcollege =  [ [ ' How important was the cost of tuition in your decision to attend college?', [ 'a) Very important', 'b) Somewhat important', 'c) Not very important', 'd) Not at all important' ] ], [ ' Which of the following best describes your current field of study?', [ 'a) STEM (science, technology, engineering, math)', 'b) Business', 'c) Humanities', 'd) Social sciences' ] ], [ ' Have you ever considered transferring to another college or university?', [ 'a) Yes', 'b) No' ] ], [ ' How would you rate the quality of instruction you have received at your college or university?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' Are you currently employed while attending college?', [ 'a) Yes, full-time', 'b) Yes, part-time', 'c) No' ] ], [ ' How do you plan to pay for your college education? (Select all that apply)', [ 'a) Scholarships', 'b) Grants', 'c) Loans', 'd) Parent/family contributions e) Personal savings' ] ], [ ' Have you ever participated in a study abroad program?', [ 'a) Yes', 'b) No' ] ], [ ' How important was the location of the college or university in your decision to attend?', [ 'a) Very important', 'b) Somewhat important', 'c) Not very important', 'd) Not at all important' ] ], [ ' What type of degree are you pursuing?', [ "a) Bachelor's", "b) Associate's", "c) Master's", 'd) Doctoral' ] ], [ 'How would you rate the availability of internship opportunities at your college or university?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' Have you ever felt overwhelmed by the workload in your courses?', [ 'a) Yes', 'b) No' ] ], [ ' How would you rate the diversity of the student body at your college or university?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' Have you ever considered taking a gap year before attending college?', [ 'a) Yes', 'b) No' ] ], [ ' How would you rate the social life at your college or university?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' Are you a member of any student organizations or clubs?', [ 'a) Yes', 'b) No' ] ], [ ' How would you rate the support provided by academic advisors at your college or university?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' Have you ever felt that your academic advisor was not helpful or supportive?', [ 'a) Yes', 'b) No' ] ], [ ' How would you rate the availability of resources for mental health and wellness at your college or university?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' Have you ever utilized resources for mental health and wellness at your college or university?', [ 'a) Yes', 'b) No' ] ], [ ' How would you rate the quality of the facilities and amenities at your college or university?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' Are you satisfied with the dining options available on campus?', [ 'a) Yes', 'b) No' ] ], [ ' How would you rate the safety and security measures in place at your college or university?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' Have you ever felt unsafe or threatened while on campus?', [ 'a) Yes', 'b) No' ] ], [ ' How would you rate the availability of career counseling and job placement services at your college or university?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. Have you ever utilized career counseling and job placement services at your college or university?', [ 'a) Yes', 'b) No' ] ], [ ". How would you rate the convenience and accessibility of the college or university's location?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. Have you ever lived on campus?', [ 'a) Yes', 'b) No' ] ], [ '. How would you rate the quality of the housing options available on campus?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. Have you ever experienced any issues with the campus housing facilities or staff?', [ 'a) Yes', 'b) No' ] ], [ '0. How would you rate the overall value of your college or university experience?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '  Would you recommend your college or university to prospective students?', [ 'a) Yes', 'b) No' ] ], [ ' Have you ever felt that your college or university experience has prepared you well for your future career?', [ 'a) Yes', 'b) No' ] ], [ '. How would you rate the level of academic challenge in your courses?', [ 'a) Very challenging', 'b) Somewhat challenging', 'c) Not very challenging', 'd) Not at all challenging' ] ], [ '. Have you ever felt bored or unchallenged in your courses?', [ 'a) Yes', 'b) No' ] ], [ '. How would you rate the level of interaction and engagement with your professors and instructors?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. Have you ever felt that your professors or instructors were not available or accessible outside of class?', [ 'a) Yes', 'b) No' ] ], [ '. How would you rate the level of collaboration and teamwork in your courses?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. Have you ever felt that your courses were too focused on memorization rather than critical thinking?', [ 'a) Yes', 'b) No' ] ], [ '. How would you rate the level of diversity in the curriculum and course offerings at your college or university?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '0. Have you ever felt that your college or university experience has helped you develop your critical thinking skills?', [ 'a) Yes', 'b) No' ] ], [ '  How would you rate the level of support provided by the college or university for students with disabilities?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' Have you ever felt that your college or university experience has helped you develop your time management skills?', [ 'a) Yes', 'b) No' ] ], [ '. How would you rate the level of flexibility in the curriculum and course offerings at your college or university?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. Have you ever felt that your college or university experience has helped you develop your leadership skills?', [ 'a) Yes', 'b) No' ] ], [ '. How would you rate the level of collaboration between students at your college or university?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. Have you ever felt that your college or university experience has helped you develop your communication skills?', [ 'a) Yes', 'b) No' ] ], [ '. How would you rate the level of support provided by the college or university for students pursuing internships or career opportunities?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. Have you ever felt that your college or university experience has helped you develop your problem-solving skills?', [ 'a) Yes', 'b) No' ] ], [ '. How would you rate the level of campus involvement and engagement in social and political issues?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '0. Have you ever felt that your college or university experience has helped you develop your global perspective and cultural awareness?', [ 'a) Yes', 'b) No' ] ] ]

const arrcolegefacility = [ [ '  How would you rate the cleanliness of the college campus?', [ 'a) Very clean', 'b) Somewhat clean', 'c) Not very clean', 'd) Not clean at all' ] ], [ ' How would you rate the availability of parking spaces on campus?', [ 'a) Plentiful', 'b) Somewhat available', 'c) Not very available', 'd) Not available at all' ] ], [ '. How would you rate the condition of the college buildings?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the quality of the food served in the college cafeteria?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the variety of food options available in the college cafeteria?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the availability of vegetarian/vegan options in the college cafeteria?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the availability of gluten-free options in the college cafeteria?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the availability of halal/kosher options in the college cafeteria?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the quality of the college library?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '0. How would you rate the availability of resources in the college library?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '  How would you rate the quality of the college gym/fitness center?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' How would you rate the variety of equipment available in the college gym/fitness center?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the availability of group fitness classes in the college gym/fitness center?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the quality of the college auditorium/theater?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the availability of student organizations/clubs on campus?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the quality of the college bookstore?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the availability of course materials in the college bookstore?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the quality of the college computer labs?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the availability of computer resources in the college computer labs?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '0. How would you rate the quality of the college classrooms?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '  How would you rate the availability of technology in the college classrooms?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' How would you rate the quality of the college student union/center?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the availability of student events/activities on campus?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the quality of the college career services?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the availability of internship opportunities through the college?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the quality of the college academic advising?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the availability of tutoring services on campus?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the quality of the college counseling services?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the availability of mental health resources on campus?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '0. How would you rate the quality of the college disability services?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '  How would you rate the availability of student housing options on campus?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' How would you rate the quality of the college dining services?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the availability of vegetarian/vegan options in the college dining services?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the availability of gluten-free options in the college dining services?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the availability of halal/kosher options in the college dining services?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the quality of the college transportation services?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the availability of parking options on campus?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the quality of the college security services?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the availability of campus resources for students with disabilities?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '0. How would you rate the quality of the college IT services?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '  How would you rate the availability of tech support on campus?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' How would you rate the quality of the college student services?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the availability of student employment opportunities on campus?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the quality of the college international student services?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the availability of language support services on campus?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the quality of the college student life services?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the availability of student organizations/clubs that align with your interests?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the quality of the college residential life services?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the availability of community service opportunities through the college?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '0. How would you rate the quality of the college overall?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ] ]

const arrcollegestaff = [ [ '  How would you rate the overall performance of the college staff?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' How would you rate the communication skills of the college staff?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the helpfulness of the college staff?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the knowledge of the college staff in their respective fields?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the professionalism of the college staff?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the availability of the college staff to assist students?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the responsiveness of the college staff to student inquiries?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the quality of advice given by the college staff to students?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the level of support provided by the college staff to students?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '0. How would you rate the ability of the college staff to handle student complaints?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '  How would you rate the fairness of the college staff in their decision-making?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' How would you rate the approachability of the college staff?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the willingness of the college staff to listen to student feedback?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the promptness of the college staff in responding to student inquiries?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the respect shown by the college staff towards students?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the ability of the college staff to accommodate diverse student needs?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the knowledge of the college staff about student affairs?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the collaboration amongst college staff members?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the willingness of the college staff to help students outside of class hours?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '0. How would you rate the empathy shown by the college staff towards students?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '  How would you rate the guidance provided by the college staff for career development?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' How would you rate the expertise of the college staff in their respective fields?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the adaptability of the college staff to changing circumstances?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the availability of the college staff for ment of students?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the level of enthusiasm shown by the college staff in their work?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the ability of the college staff to foster a positive learning environment?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the ability of the college staff to handle difficult situations?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the level of creativity shown by the college staff in their teaching methods?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the level of organization shown by the college staff in their work?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '0. How would you rate the ability of the college staff to communicate effectively with students of diverse cultural backgrounds?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '  How would you rate the level of familiarity of the college staff with student development theories?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' How would you rate the ability of the college staff to recognize and address student challenges?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the level of collaboration between the college staff and other departments within the institution?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the ability of the college staff to manage conflicts?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the level of professional development pursued by the college staff?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the ability of the college staff to provide personalized attention to students?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the level of accessibility of the college staff to students with disabilities?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the ability of the college staff to address student concerns about diversity and inclusion?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ". How would you rate the level of respect shown by the college staff towards students' privacy and confidentiality?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '0. How would you rate the willingness of the college staff to provide feedback to students?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '  How would you rate the ability of the college staff to understand and address student needs?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' How would you rate the level of patience shown by the college staff in dealing with challenging student situations?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the level of knowledge shown by the college staff in their area of expertise?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the ability of the college staff to lead by example?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the level of accountability shown by the college staff in their work?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the ability of the college staff to foster a sense of community among students?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the level of flexibility shown by the college staff in adapting to changing student needs?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the degree to which the college staff engage in shared governance and decision-making?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. How would you rate the ability of the college staff to maintain confidentiality?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '0. How would you rate the overall job satisfaction of the college staff?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ] ]

const arrhospital = [ [ '  How would you rate the quality of care you received during your last hospital visit?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' How would you rate the cleanliness of the hospital environment?', [ 'a) Very clean', 'b) Somewhat clean', 'c) Needs improvement', 'd) Very dirty' ] ], [ '. How would you rate the friendliness of the hospital staff?', [ 'a) Very friendly', 'b) Somewhat friendly', 'c) Needs improvement', 'd) Not friendly at all' ] ], [ '. How long did you have to wait before being seen by a doctor?', [ 'a) Less than  minutes', 'b) -0 minutes', 'c) 0-0 minutes', 'd) More than 0 minutes' ] ], [ '. How would you rate the communication skills of the hospital staff?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. Were you satisfied with the explanation of your treatment plan?', [ 'a) Yes', 'b) No' ] ], [ '. Did the hospital staff respect your privacy?', [ 'a) Yes', 'b) No' ] ], [ '. How would you rate the comfort of the hospital bed and amenities?', [ 'a) Very comfortable', 'b) Somewhat comfortable', 'c) Needs improvement', 'd) Not comfortable at all' ] ], [ '. How would you rate the quality of the hospital food?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '0. Were you able to get the assistance you needed from the hospital staff?', [ 'a) Yes', 'b) No' ] ], [ '  How would you rate the availability of hospital staff to answer questions?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ' How would you rate the overall experience of your hospital stay?', [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ '. Would you recommend this hospital to a friend or family member?', [ 'a) Yes', 'b) No' ] ], [ '. How likely are you to return to this hospital for future medical needs?', [ 'a) Very likely', 'b) Somewhat likely', 'c) Not very likely', 'd) Not at all likely' ] ], [ '. How would you rate the ease of accessing your medical records and test results?', [ 'a) Very easy', 'b) Somewhat easy', 'c) Needs improvement', 'd) Very difficult' ] ], [ ". How would you rate the hospital's response to your concerns and complaints?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "How would you rate the hospital's policy on patient safety?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ". How would you rate the hospital's policy on patient confidentiality?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ ". How would you rate the hospital's policy on visiting hours and rules?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "0. How would you rate the hospital's policy on discharge and follow-up care?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "  How would you rate the hospital's policy on pain management?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "How would you rate the hospital's policy on medication management?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "How would you rate the hospital's policy on patient education and information?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "How would you rate the hospital's policy on advanced directives and end-of-life care?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "How would you rate the hospital's policy on patient satisfaction and feedback?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "How would you rate the hospital's policy on staffing and employee performance?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "How would you rate the hospital's policy on facility maintenance and upkeep?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "How would you rate the hospital's policy on infection control and prevention?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "How would you rate the hospital's policy on emergency preparedness and response?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "How would you rate the hospital's policy on patient privacy and confidentiality?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "How would you rate the hospital's policy on patient rights and responsibilities?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "How would you rate the hospital's policy on visiting physicians and specialists?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "How would you rate the hospital's policy on clinical trials and research?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "How would you rate the hospital's policy on collaborating with other healthcare providers?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "How would you rate the hospital's policy on community outreach and engagement?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "How would you rate the hospital's policy on employee training and development?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "How would you rate the hospital's policy on patient safety and quality of care?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "How would you rate the hospital's policy on patient satisfaction and experience?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "How would you rate the hospital's policy on hospital-acquired infections and complications?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "How would you rate the hospital's policy on prescribing and managing medications?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ " How would you rate the hospital's policy on managing patient confidentiality and privacy?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "How would you rate the hospital's policy on providing emotional and spiritual support?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "How would you rate the hospital's policy on managing patient pain and discomfort?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ " How would you rate the hospital's policy on assisting patients with daily needs and activities?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ " How would you rate the hospital's policy on addressing patient concerns and complaints?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "How would you rate the hospital's policy on maintaining accurate and complete medical records?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ " How would you rate the hospital's policy on coordinating care with other healthcare providers?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ " How would you rate the hospital's policy on patient education and awareness?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "How would you rate the hospital's policy on managing patient flow and throughput?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ], [ "How would you rate the hospital's overall performance and quality of care?", [ 'a) Excellent', 'b) Good', 'c) Fair', 'd) Poor' ] ] ]

mapi.set(["college"],arrcollege)
mapi.set(["college facilities"],arrcollege)
mapi.set(["college staff"],arrcollege)
mapi.set(["hospital"],arrcollege)
//
let newformdesc='hospital';
let i= Math.floor(Math.random() * 50) + 1;
function getValueByKeyElement(map, key) {
  
  for (let [mapKey, mapValue] of map.entries()) {
    if (mapKey.includes(key)) {
      return mapValue;
    }
  }
  return null;
}

const mapValue = getValueByKeyElement(mapi, newformdesc);
let label = mapValue ? mapValue[i][0] : "default label"; 
let options = mapValue ? mapValue[i][1] : ["Excellent" , "Good" , "okay" , "poor"];
export function incrementindexai (){
  i= Math.floor(Math.random() * 50) + 1;
  label = mapValue ? mapValue[i][0] : "default label"; 
  options = mapValue ? mapValue[i][1] : ["Excellent" , "Good" , "okay" , "poor"];
 
}


  // Use default label if mapValue is null

let extraAttributes = {
  label ,
  helperText: "Helper text",
  required: false,
  placeHolder: "Value here...",
  options,
};

// function getExtraAttributes({ form }: { form: FormModel }) {
//   formdesc =  form.description ;
// }

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeHolder: z.string().max(50),
  options: z.array(z.string()).default([]),
});



export const AiSelectFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: RxDropdownMenu,
    label: "Ai Select Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (formElement: FormElementInstance, currentValue: string): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue.length > 0;
    }

    return true;
  },
  // description: "",
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  // i= Math.floor(Math.random() * 50) + 1;
  const element = elementInstance as CustomInstance;
  const { label, required, placeHolder, helperText } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
      </Select>
      {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
    </div>
  );
}



function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;
  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, required, placeHolder, helperText, options } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={`text-muted-foreground ${error ? 'text-red-500' : ''}`}>
        {label}
        {required && "*"}
      </Label>
      {/* Replacing Select with ul for visibility */}
      <ul className={`border w-full rounded-md ${error ? 'border-red-500' : 'border-gray-300'}`}>
        {options.map((option) => (
          <li
            key={option}
            className={` p-2 hover:bg-secondary hover:text-primary cursor-pointer ${value === option ? 'bg-secondary text-primary' : ''}`}

            onClick={() => {
              setValue(option);
              if (!submitValue) return;
              const valid = AiSelectFieldFormElement.validate(element, option);
              setError(!valid);
              submitValue(element.id, option);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
      {helperText && <p className={`text-[0.8rem] text-muted-foreground ${error ? 'text-red-500' : ''}`}>{helperText}</p>}
    </div>
  );
}




type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;
function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  i= Math.floor(Math.random() * 50) + 1;
  const element = elementInstance as CustomInstance;
  const { updateElement, setSelectedElement } = useDesigner();
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onSubmit",
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      placeHolder: element.extraAttributes.placeHolder,
      options: element.extraAttributes.options,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    const { label, helperText, placeHolder, required, options } = values;
    

    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        placeHolder,
        required,
        options,
      },
    });

    toast({
      title: "Success",
      description: "Properties saved successfully",
    });

    setSelectedElement(null);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(applyChanges)} className="space-y-">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The label of the field. <br /> It will be displayed above the field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="placeHolder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PlaceHolder</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>The placeholder of the field.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The helper text of the field. <br />
                It will be displayed below the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="options"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Options</FormLabel>
                <Button
                  variant={"outline"}
                  className="gap-2"
                  onClick={(e) => {
                    e.preventDefault(); // avoid submit
                    form.setValue("options", field.value.concat("New option"));
                  }}
                >
                  <AiOutlinePlus />
                  Add
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {form.watch("options").map((option, index) => (
                  <div key={index} className="flex items-center justify-between gap-1">
                    <Input
                      placeholder=""
                      value={option}
                      onChange={(e) => {
                        field.value[index] = e.target.value;
                        field.onChange(field.value);
                      }}
                    />
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      onClick={(e) => {
                        e.preventDefault();
                        const newOptions = [...field.value];
                        newOptions.splice(index, 1);
                        field.onChange(newOptions);
                      }}
                    >
                      <AiOutlineClose />
                    </Button>
                  </div>
                ))}
              </div>

              <FormDescription>
                The helper text of the field. <br />
                It will be displayed below the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Required</FormLabel>
                <FormDescription>
                  The helper text of the field. <br />
                  It will be displayed below the field.
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <Button className="w-full" type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
}

