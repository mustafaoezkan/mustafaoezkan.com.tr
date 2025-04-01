/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-extraneous-dependencies */
import {
  SiJavascript, SiTypescript, SiRedux, SiTailwindcss, SiExpress, SiPostman,
} from 'react-icons/si';
import {
  FaReact, FaNodeJs, FaJava, FaVuejs, FaGithub, FaDocker,
} from 'react-icons/fa';
import { FaGolang } from 'react-icons/fa6';
import { BiLogoSpringBoot, BiLogoPostgresql } from 'react-icons/bi';

const techStacks = [
  {
    title: 'Java',
    icon: <FaJava size={50} style={{ color: '#ED8B00' }} />,
  },
  {
    title: 'React.js',
    icon: <FaReact size={50} style={{ color: '#61DAFB' }} />,
  },
  {
    title: 'Spring Boot',
    icon: <BiLogoSpringBoot size={50} style={{ color: '#6DB33F' }} />,
  },
  {
    title: 'JavaScript',
    icon: <SiJavascript size={50} style={{ color: 'rgb(255, 255, 0)', background: 'black' }} />,
  },
  {
    title: 'TypeScript',
    icon: <SiTypescript size={50} style={{ color: '#007ACC' }} />,
  },
  {
    title: 'Vue.js',
    icon: <FaVuejs size={50} style={{ color: '#42b883' }} />,
  },
  {
    title: 'Node.js',
    icon: <FaNodeJs size={50} style={{ color: '#8CC84B' }} />,
  },
  {
    title: 'Express.js',
    icon: <SiExpress size={50} style={{ color: '#000' }} />,
  },
  {
    title: 'Golang',
    icon: <FaGolang size={50} style={{ color: '#00ADD8' }} />,
  },
  {
    title: 'PostgreSQL',
    icon: <BiLogoPostgresql size={50} style={{ color: '#336791' }} />,
  },
  {
    title: 'Docker',
    icon: <FaDocker size={50} style={{ color: '#0db7ed' }} />,
  },
  {
    title: 'GitHub',
    icon: <FaGithub size={50} style={{ color: '#000' }} />,
  },
  {
    title: 'Postman',
    icon: <SiPostman size={50} style={{ color: '#FF6C37' }} />,
  },
  {
    title: 'Tailwind CSS',
    icon: <SiTailwindcss size={50} style={{ color: '#38B2AC' }} />,
  },
  {
    title: 'Redux',
    icon: <SiRedux size={50} style={{ color: '#764abc' }} />,
  },
];

export default techStacks;
