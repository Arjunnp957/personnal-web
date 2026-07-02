import {
  SiPython, SiJavascript, SiCplusplus,SiOpenjdk,
  SiDjango, SiNodedotjs,
  SiReact, SiHtml5, SiJquery,
  SiMysql, SiPostgresql, SiSqlite, SiMongodb,
  SiGit, SiGithub, SiPostman, SiLinux,
  SiNginx, 
  SiSpacy, SiOpencv,
  SiCss, 
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { FiCode, FiServer, FiCloud, FiCpu } from 'react-icons/fi';

// Keys are normalized: lowercased, trimmed, and repeated spaces collapsed to one.
// So "Java  Script" (double space) and "Java Script" both match the same entry.
const ICON_MAP = {
  'python': SiPython,
  'java': SiOpenjdk,
  'c++': SiCplusplus,
  'java script': SiJavascript,

  'django': SiDjango,
  'django rest framework': SiDjango,
  "rest api's": FiServer,
  'node.js': SiNodedotjs,

  'react.js': SiReact,
  'html 5': SiHtml5,
  'css 3': SiCss,
  'jquery': SiJquery,

  'mysql': SiMysql,
  'postgressql': SiPostgresql,
  'sqlite': SiSqlite,
  'mongo.db': SiMongodb,

  'git': SiGit,
  'github': SiGithub,
  'vs code': VscVscode,
  'postman': SiPostman,
  'linux(ubuntu)': SiLinux,

  'nginx': SiNginx,
  'gunicorn': FiServer,
  'vps hosting': FiServer,
  'aws': FiCloud,
  'domain and ssl configuration': FiCloud,

  'natural language processing': FiCpu,
  'computer vision': SiOpencv,
  'spacy': SiSpacy,
  'pyttsx3': FiCpu,
  'opencv': SiOpencv,
  'pyaudio': FiCpu,

  'power bi': FiCpu,
  'data visualization': FiCpu,
  'dashboard reporting': FiCpu,
  'data analysis': FiCpu,
};

function normalize(name) {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function getSkillIcon(skillName) {
  return ICON_MAP[normalize(skillName)] || FiCode;
}