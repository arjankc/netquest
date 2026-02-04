import { Category, Question } from './types';

export const CATEGORIES: Category[] = [
  { id: 'basics', title: 'Network Basics', iconName: 'Globe' },
  { id: 'media', title: 'Wired vs Wireless', iconName: 'Wifi' },
  { id: 'types', title: 'LAN, MAN, WAN', iconName: 'Network' },
  { id: 'topo', title: 'Topologies', iconName: 'Share2' },
  { id: 'ip', title: 'IP Address', iconName: 'Hash' },
  { id: 'sec', title: 'Security & Cloud', iconName: 'Lock' },
];

export const TEAM_COLORS = [
  'bg-red-600',
  'bg-blue-600',
  'bg-green-700',
  'bg-purple-600',
  'bg-orange-700',
  'bg-pink-600'
];

export const TEAM_ICONS = ['Rocket', 'Zap', 'Star', 'Crown', 'Smile', 'Heart'];

// Helper to create simple text options
const createOptions = (correctIndex: number, ...texts: string[]) => {
  return texts.map((text, idx) => ({
    id: `opt-${idx}`,
    text,
    isCorrect: idx === correctIndex
  }));
};

export const QUESTIONS: Question[] = [
  // --- BASICS ---
  {
    id: 'b-100', categoryId: 'basics', points: 100,
    questionText: 'What is the primary purpose of a computer network?',
    options: createOptions(0, 'Sharing resources and data', 'Making computers look cool', 'Increasing electricity usage', 'Printing paper faster'),
    explanation: 'Networks allow devices to share files, printers, and internet connections.'
  },
  {
    id: 'b-200', categoryId: 'basics', points: 200,
    questionText: 'Which element is NOT part of a basic communication model?',
    options: createOptions(2, 'Sender', 'Receiver', 'Printer', 'Medium (Channel)'),
    explanation: 'The basic elements are Sender, Receiver, Message, and Medium.'
  },
  {
    id: 'b-300', categoryId: 'basics', points: 300,
    questionText: 'In a home network, your laptop is usually the...',
    options: createOptions(0, 'Client', 'Server', 'Mainframe', 'ISP'),
    explanation: 'Your laptop requests information (websites, videos) from servers, making it a Client.'
  },
  {
    id: 'b-400', categoryId: 'basics', points: 400,
    questionText: 'Which device typically connects your home network to the Internet Service Provider (ISP)?',
    options: createOptions(1, 'Switch', 'Modem/Router', 'Repeater', 'Hub'),
    explanation: 'The Modem modulates signals to communicate with the ISP, and the Router directs traffic.'
  },
  {
    id: 'b-500', categoryId: 'basics', points: 500,
    questionText: 'Which device decides where to send data packets to ensure they reach the correct destination network?',
    options: createOptions(1, 'Hub', 'Router', 'Switch', 'Repeater'),
    explanation: 'Routers are the "traffic controllers" of the internet, directing packets between different networks.'
  },
  {
    id: 'b-600', categoryId: 'basics', points: 600,
    questionText: 'What does "IoT" stand for?',
    options: createOptions(2, 'Input of Technology', 'Internal Office Tools', 'Internet of Things', 'International Online Trade'),
    explanation: 'IoT refers to everyday objects (lights, fridges, cars) connected to the internet.'
  },

  // --- MEDIA ---
  {
    id: 'm-100', categoryId: 'media', points: 100,
    questionText: 'Which transmission medium uses light to send data very fast?',
    options: createOptions(2, 'Copper Wire', 'Coaxial Cable', 'Fiber Optic', 'Bluetooth'),
    explanation: 'Fiber Optic cables use pulses of light (lasers/LEDs) to transmit data.'
  },
  {
    id: 'm-200', categoryId: 'media', points: 200,
    questionText: 'Which is a wireless technology used for short-range connections (like headphones)?',
    options: createOptions(0, 'Bluetooth', 'Fiber', 'Ethernet', 'Satellite'),
    explanation: 'Bluetooth is designed for PAN (Personal Area Networks) over short distances.'
  },
  {
    id: 'm-300', categoryId: 'media', points: 300,
    questionText: 'Scenario: You are wiring an old office building with lots of electrical interference. Which cable is best?',
    options: createOptions(1, 'Unshielded Twisted Pair', 'Shielded Twisted Pair or Fiber', 'WiFi', 'Bluetooth'),
    explanation: 'Shielding protects against Electromagnetic Interference (EMI) from machinery or old wiring.'
  },
  {
    id: 'm-400', categoryId: 'media', points: 400,
    questionText: 'True or False: Wireless signals can travel through thick concrete walls without any signal loss.',
    options: createOptions(1, 'True', 'False'),
    explanation: 'False. Concrete and metal significantly absorb and reflect WiFi signals.'
  },
  {
    id: 'm-500', categoryId: 'media', points: 500,
    questionText: 'What term describes the "delay" or time it takes for data to travel from source to destination?',
    options: createOptions(2, 'Bandwidth', 'Throughput', 'Latency', 'Frequency'),
    explanation: 'Latency (or ping) is the time delay. High latency causes lag in games or calls.'
  },
  {
    id: 'm-600', categoryId: 'media', points: 600,
    questionText: 'Which cellular technology is the newest and provides the fastest mobile internet speeds?',
    options: createOptions(2, '3G', '4G LTE', '5G', 'GPRS'),
    explanation: '5G offers higher speeds, lower latency, and capacity for more devices than 4G.'
  },

  // --- TYPES ---
  {
    id: 't-100', categoryId: 'types', points: 100,
    questionText: 'A network contained within a single room or building is a...',
    options: createOptions(0, 'LAN (Local Area Network)', 'MAN (Metropolitan Area Network)', 'WAN (Wide Area Network)', 'PAN (Personal Area Network)'),
    explanation: 'LANs are small, local networks like in a home or office.'
  },
  {
    id: 't-200', categoryId: 'types', points: 200,
    questionText: ' The Internet is the largest example of a...',
    options: createOptions(2, 'LAN', 'MAN', 'WAN', 'SAN'),
    explanation: 'WAN (Wide Area Network) spans large geographical distances (countries/continents).'
  },
  {
    id: 't-300', categoryId: 'types', points: 300,
    questionText: 'A network connecting different company branches across a whole city is best described as a...',
    options: createOptions(1, 'LAN', 'MAN', 'WAN', 'PAN'),
    explanation: 'MAN (Metropolitan Area Network) connects users within a city area.'
  },
  {
    id: 't-400', categoryId: 'types', points: 400,
    questionText: 'Which network type is likely owned by a single person?',
    options: createOptions(0, 'PAN (Personal Area Network)', 'WAN', 'MAN', 'The Internet'),
    explanation: 'PANs are personal, like your phone connected to your watch and headphones.'
  },
  {
    id: 't-500', categoryId: 'types', points: 500,
    questionText: 'A security device that sits between a private network and the public internet is called a...',
    options: createOptions(3, 'Switch', 'Server', 'Modem', 'Firewall'),
    explanation: 'A Firewall filters traffic, blocking unauthorized access to the internal network.'
  },
  {
    id: 't-600', categoryId: 'types', points: 600,
    questionText: 'A private network accessible only to an organization\'s staff is called an...',
    options: createOptions(0, 'Intranet', 'Extranet', 'Internet', 'Dark Web'),
    explanation: 'An Intranet is a private internal network, while the Internet is public.'
  },

  // --- TOPOLOGIES ---
  {
    id: 'top-100', categoryId: 'topo', points: 100,
    questionText: 'Which topology connects all devices to a central device (like a Switch)?',
    options: createOptions(0, 'Star', 'Bus', 'Ring', 'Mesh'),
    topologyVisual: 'star',
    explanation: 'Star topology is the most common, featuring a central hub/switch.'
  },
  {
    id: 'top-200', categoryId: 'topo', points: 200,
    questionText: 'In this topology, if the main cable breaks, the whole network goes down.',
    options: createOptions(1, 'Star', 'Bus', 'Ring', 'Mesh'),
    topologyVisual: 'bus',
    explanation: 'Bus topology uses a single backbone cable. If it snaps, communication stops.'
  },
  {
    id: 'top-300', categoryId: 'topo', points: 300,
    questionText: 'Which topology is the most expensive but most reliable because every device connects to every other device?',
    options: createOptions(3, 'Star', 'Bus', 'Ring', 'Full Mesh'),
    topologyVisual: 'mesh',
    explanation: 'Full Mesh provides high redundancy but requires many cables.'
  },
  {
    id: 'top-400', categoryId: 'topo', points: 400,
    questionText: 'Data travels in one direction, passing through each computer until it reaches the destination.',
    options: createOptions(2, 'Star', 'Bus', 'Ring', 'Mesh'),
    topologyVisual: 'ring',
    explanation: 'Token Ring networks pass a token around the circle.'
  },
  {
    id: 'top-500', categoryId: 'topo', points: 500,
    questionText: 'A "Tree" topology is usually a combination of which two topologies?',
    options: createOptions(0, 'Star and Bus', 'Ring and Mesh', 'Star and Ring', 'Mesh and Bus'),
    explanation: 'A Tree topology typically consists of Star networks connected via a Bus backbone.'
  },
  {
    id: 'top-600', categoryId: 'topo', points: 600,
    questionText: 'Which topology is a mix of two or more different topologies?',
    options: createOptions(2, 'Complex', 'Double', 'Hybrid', 'Compound'),
    explanation: 'A Hybrid topology combines multiple types (e.g., Star-Bus) to fit specific needs.'
  },

  // --- IP BASICS ---
  {
    id: 'ip-100', categoryId: 'ip', points: 100,
    questionText: 'What does "IP" stand for?',
    options: createOptions(1, 'Internal Phone', 'Internet Protocol', 'Instant Post', 'International Port'),
    explanation: 'Internet Protocol is the set of rules governing data format and addressing.'
  },
  {
    id: 'ip-200', categoryId: 'ip', points: 200,
    questionText: 'Which of these looks like a standard IPv4 address?',
    options: createOptions(0, '192.168.1.1', 'A1:B2:C3:D4', 'www.google.com', '2001:0db8:85a3:0000'),
    explanation: 'IPv4 uses four numbers (0-255) separated by dots.'
  },
  {
    id: 'ip-300', categoryId: 'ip', points: 300,
    questionText: 'Why are we moving from IPv4 to IPv6?',
    options: createOptions(0, 'We ran out of IPv4 addresses', 'IPv6 is cheaper', 'IPv6 cables are smaller', 'IPv4 was too fast'),
    explanation: 'The explosion of internet devices exhausted the ~4 billion IPv4 addresses.'
  },
  {
    id: 'ip-400', categoryId: 'ip', points: 400,
    questionText: 'True or False: An IP address is like a mailing address for a computer.',
    options: createOptions(0, 'True', 'False'),
    explanation: 'True. It uniquely identifies a device so data knows where to go.'
  },
  {
    id: 'ip-500', categoryId: 'ip', points: 500,
    questionText: 'Which system translates human-friendly names like "google.com" into IP addresses?',
    options: createOptions(3, 'DHCP', 'HTTP', 'VPN', 'DNS'),
    explanation: 'DNS (Domain Name System) is the "phonebook" of the internet.'
  },
  {
    id: 'ip-600', categoryId: 'ip', points: 600,
    questionText: 'Every network card has a permanent, unique physical ID called a...',
    options: createOptions(1, 'IP Address', 'MAC Address', 'DNS Name', 'Zip Code'),
    explanation: 'The MAC (Media Access Control) address is hard-coded into the hardware.'
  },

  // --- SECURITY & CLOUD ---
  {
    id: 'sec-100', categoryId: 'sec', points: 100,
    questionText: 'What is a simple way to protect your account from unauthorized access?',
    options: createOptions(0, 'Use a strong, unique password', 'Write your password on a post-it', 'Use "password123"', 'Share it with your best friend'),
    explanation: 'Complex passwords prevent easy guessing or hacking.'
  },
  {
    id: 'sec-200', categoryId: 'sec', points: 200,
    questionText: 'Harmful software designed to damage or gain unauthorized access to a computer is called...',
    options: createOptions(2, 'Hardware', 'Firmware', 'Malware', 'Shareware'),
    explanation: 'Malware includes viruses, worms, and ransomware.'
  },
  {
    id: 'sec-300', categoryId: 'sec', points: 300,
    questionText: 'An email pretending to be from your bank asking you to click a link is likely...',
    options: createOptions(1, 'Fishing', 'Phishing', 'Spamming', 'Hacking'),
    explanation: 'Phishing attacks try to trick you into revealing personal information.'
  },
  {
    id: 'sec-400', categoryId: 'sec', points: 400,
    questionText: 'When you store files on Google Drive or Dropbox, you are using...',
    options: createOptions(1, 'Local Storage', 'Cloud Storage', 'Flash Storage', 'RAM'),
    explanation: 'Cloud storage saves data on remote servers accessed via the internet.'
  },
  {
    id: 'sec-500', categoryId: 'sec', points: 500,
    questionText: 'Which tool creates a secure, encrypted "tunnel" for your internet connection?',
    options: createOptions(3, 'GPS', 'ISP', 'DNS', 'VPN'),
    explanation: 'A VPN (Virtual Private Network) hides your activity and protects data on public WiFi.'
  },
  {
    id: 'sec-600', categoryId: 'sec', points: 600,
    questionText: 'What does the "S" in "HTTPS" stand for?',
    options: createOptions(0, 'Secure', 'Simple', 'Speed', 'Standard'),
    explanation: 'HTTPS (Hypertext Transfer Protocol Secure) encrypts communication between browser and website.'
  },
];