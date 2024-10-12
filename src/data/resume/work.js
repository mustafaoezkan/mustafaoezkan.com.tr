/**
 * @typedef {Object} Position
 * Conforms to https://jsonresume.org/schema/
 *
 * @property {string} name - Name of the company
 * @property {string} position - Position title
 * @property {string} url - Company website
 * @property {string} startDate - Start date of the position in YYYY-MM-DD format
 * @property {string|undefined} endDate - End date of the position in YYYY-MM-DD format.
 * If undefined, the position is still active.
 * @property {string|undefined} summary - html/markdown summary of the position
 * @property {string[]} highlights - plain text highlights of the position (bulleted list)
 */
const work = [
  {
    name: 'Huawei',
    position: 'Software Engineer',
    url: 'https://www.huawei.com/',
    logo: 'https://www-file.huawei.com/-/media/corporate/images/home/logo/huawei_logo.png',
    startDate: '2022-09-26',
    summary: 'Contributed to a diverse range of projects at Huawei, focusing on domains such as Fintech, ICT education, open-source library development, and mobile services. Leveraged cutting-edge technologies including Vue.js, React, React-Native, JavaScript, TypeScript, and Java Spring Boot to develop scalable and secure applications, and enhance both user experience and operational efficiency.',
    highlights: [
      'Worked with Vue.js to enhance global student training platforms, improving scalability and user interaction in the education technology domain.',
      'Utilized TypeScript and vanilla JavaScript to build and extend open-source graph tools, particularly focusing on graph rendering and flexibility in the library development domain.',
      'Developed a tag management system using vanilla JavaScript to streamline digital marketing operations and improve website performance.',
      'Contributed to Fintech solutions with a focus on payment system integration using Vue.js and TypeScript, ensuring secure and scalable financial transactions.',
      'Built React Native plugins for Huawei Mobile Services (HMS) Core, enhancing mobile services across areas like Location Kit and Account Kit for millions of users worldwide.',
      'Developed internal enterprise systems using React and Java Spring Boot, optimizing operational processes in enterprise software development.',
    ],
  },
  {
    name: 'Erciyes University IT Department',
    position: 'Intern',
    url: 'https://www.erciyes.edu.tr/',
    logo: 'https://www.erciyes.edu.tr/images/logo.png',
    startDate: '2022-08-12',
    endDate: '2022-09-12',
    summary: 'Built a full-stack inventory management system using React.js and Node.js. Implemented features for tracking items, managing stock levels, and generating reports, improving internal processes.',
    highlights: [
      'Developed a full-stack inventory management system using React.js and Node.js.',
      'Implemented item tracking, stock level management, and report generation features.',
      'Improved internal processes through the automation of inventory management.',
    ],
  },
  {
    name: 'CTech',
    position: 'Intern',
    url: 'https://ctech.com.tr/en/',
    logo: 'https://ctech.com.tr/wp-content/uploads/2023/06/logo.png',
    startDate: '2021-08-02',
    endDate: '2021-09-02',
    summary: 'Contributed to developing a live broadcast application with Flutter and RTMP protocol. Ensured seamless integration with the live broadcast device and enhanced user experiences with video streaming and real-time interaction features.',
    highlights: [
      'Developed a live broadcast application using Flutter and RTMP protocol.',
      'Improved user experience with real-time interaction and video streaming features.',
      'Ensured seamless integration with the live broadcast device.',
    ],
  },
];

export default work;
