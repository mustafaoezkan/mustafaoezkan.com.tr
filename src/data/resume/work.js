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
    name: 'Yapı Kredi Technology',
    position: 'Expert Software Engineer',
    url: 'https://www.ykteknoloji.com.tr/en/',
    logo: 'https://turkiye.ai/wp-content/uploads/2021/01/Yapi-Kredi-Teknoloji.png',
    startDate: '2025-02-17',
    summary: 'Worked as a Full Stack Developer in the core banking domain, focusing on deposit application development. Built backend services with Java Spring Boot and interactive frontend interfaces with React.js. Utilized Oracle for data modeling and transaction management. Contributed to the migration from a monolithic architecture to a microservices-based structure. Developed unit tests and participated in batch job automation using UC4 within a highly regulated enterprise environment.',
    highlights: [
      'Played an active role in migrating legacy banking systems from a monolithic to a microservices architecture using Java Spring Boot.',
      'Developed high-performance and reliable backend services for deposit operations.',
      'Built responsive and maintainable frontend components using React.js.',
      'Handled complex data modeling and optimized queries with Oracle Database.',
      'Wrote unit tests using JUnit and Mockito to improve code quality and prevent regressions.',
      'Automated scheduled batch operations with UC4 to ensure timely and efficient processing.',
      'Collaborated with cross-functional teams to maintain clean code practices and support CI/CD workflows.',
      'Improved system observability and debugging capabilities during the microservice transformation.',
    ],
  },
  {
    name: 'Huawei',
    position: 'Software Engineer',
    url: 'https://www.huawei.com/',
    logo: 'https://www-file.huawei.com/-/media/corporate/images/home/logo/huawei_logo.png',
    startDate: '2022-09-26',
    endDate: '2025-02-06',
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
