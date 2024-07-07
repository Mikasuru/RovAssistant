"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const characterNames = [
    'Mina', 'Grakk', 'Thane', 'Toro', 'Teemee', 'Zip', 'Annette', 'Aya', 'Helen', 'Lumburr',
    'Arum', 'Xeniel', 'Alice', 'Baldum', 'Chaugnar', 'Omega', 'Cresht', 'Krizzix', 'Gildur', 'Rouie',
    'Ishar', 'Sephera', 'Taara', 'Skud', 'Maloch', 'Roxie', 'Arduin', 'Y\'bneth', 'Dextra', 'Ormarr',
    'Max', 'Wiro', 'Ata', 'Zata', 'Krixi', 'Kahlii', 'Lorion', 'Aleister', 'Lauriel', 'Ilumia',
    'Natalya', 'Veera', 'Diao Chan', 'Mganga', 'Raz', 'Tulen', 'Liliana', 'Ignis', 'Jinna', 'Preyta',
    'Marja', 'Azzen\'Ka', 'D\'Arcy', 'Dirak', 'Iggy', 'Bonnie', 'Yue', 'Florentino', 'Veres', 'Zuka',
    'Omen', 'Wonder Woman', 'Amily', 'Volkath', 'Riktor', 'Zephys', 'Zanis', 'Qi', 'Airi', 'Yena',
    'Allain', 'Butterfly', 'Ryoma', 'Mortos', 'Yan', 'Kil\'Groth', 'Lubu', 'Superman', 'Errol', 'Astrid',
    'Rourke', 'Tachi', 'Bijan', 'Wukong', 'Nakroth', 'Kaine', 'Murad', 'Kirknak', 'Keera', 'Bright',
    'Sinestrea', 'Quillen', 'Enzo', 'Zill', 'Paine', 'The Flash', 'Aoi', 'Yorn', 'Valhein', 'Elsu',
    'Violet', 'Hayate', 'Laville', 'Tel\'Annas', 'Celica', 'Slimz', 'Thorne', 'Capheny', 'Lindis',
    'Elend\'orr', 'Fennik', 'Moren', 'Skuart', 'Wisp', 'Teeri', 'Ming', 'Erin', 'Charlot'
  ];

const fetchCharacterData = async (characterName) => {
  const res = await fetch(`/data/${characterName}/skills.json`);
  if (!res.ok) throw new Error('Failed to fetch character data');
  return res.json();
};

export default function Character() {
    const [name, setName] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [reductionPercent, setReductionPercent] = useState(0);
    const [activeTab, setActiveTab] = useState('Skill 1');
    const router = useRouter();
  
    useEffect(() => {
      if (name && characterNames.includes(name)) {
        fetchCharacterData(name)
          .then(data => setSelectedCharacter(data))
          .catch(err => console.error(err));
      } else {
        setSelectedCharacter(null);
      }
    }, [name]);
  
    const handleChange = (e) => {
      const value = e.target.value;
      setName(value);
  
      if (value.length > 1) {
        const filteredSuggestions = characterNames.filter(name =>
          name.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      } else {
        setSuggestions([]);
      }
    };
  
    const handleSuggestionClick = (suggestion) => {
      setName(suggestion);
      setSuggestions([]);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (selectedCharacter) {
        alert(`Character name submitted: ${name}`);
      }
    };
  
    const calculateSkill = (base, reductions, percent) => {
      const reduction = Object.keys(reductions).reduce((prev, curr) =>
        (parseFloat(curr) <= percent ? reductions[curr] : prev)
      , base);
      return reduction;
    };
  
    return (
      <main>
        <h1>ข้อมูลของตัวละคร (BETA)</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="characterName">คุณสามารถดูข้อมูลคูลดาวน์สกิลต่างๆของฮีโร่แต่ละตัวในนี้ได้</label>
          <label>(ชื่อฮีโร่ต้องเป็นอังกฤษ)</label>
          <div style={{ position: 'relative' }}>
            <input
              id="characterName"
              type="text"
              value={name}
              onChange={handleChange}
              placeholder="พิมพ์ชื่อฮีโร่เลย"
            />
            {suggestions.length > 0 && (
              <div className="suggestions">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
          <br />
        </form>
        <button onClick={() => router.push('/')}>กลับไปยังหน้าคำนวณคูลดาวน์สกิลชาเลนเจอร์</button>
        {selectedCharacter && (
          <div className="character-info">
            <h2>{name}</h2>
            <div className="tabs">
              <button
                className={activeTab === 'Skill 1' ? 'active' : ''}
                onClick={() => setActiveTab('Skill 1')}
              >
                Skill 1
              </button>
              <button
                className={activeTab === 'Skill 2' ? 'active' : ''}
                onClick={() => setActiveTab('Skill 2')}
              >
                Skill 2
              </button>
              <button
                className={activeTab === 'Ultimate' ? 'active' : ''}
                onClick={() => setActiveTab('Ultimate')}
              >
                Ultimate
              </button>
            </div>
            <div className="tab-content">
              {activeTab === 'Skill 1' && selectedCharacter['Skill 1'] && (
                <table>
                  <thead>
                    <tr>
                      <th>%</th>
                      <th>1</th>
                      <th>2</th>
                      <th>3</th>
                      <th>4</th>
                      <th>5</th>
                      <th>6</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(selectedCharacter['Skill 1'].reductions).map((percent, index) => (
                      <tr key={percent}>
                        <td>{percent}%</td>
                        {[...Array(6).keys()].map(i => (
                          <td key={i}
                              style={{ backgroundColor: (index % 2 === 0 ? '#e0f7fa' : '#ffffff') }}>
                            {calculateSkill(selectedCharacter['Skill 1'].base, selectedCharacter['Skill 1'].reductions, parseFloat(percent))}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {activeTab === 'Skill 2' && selectedCharacter['Skill 2'] && (
                <table>
                  <thead>
                    <tr>
                      <th>%</th>
                      <th>1</th>
                      <th>2</th>
                      <th>3</th>
                      <th>4</th>
                      <th>5</th>
                      <th>6</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(selectedCharacter['Skill 2'].reductions).map((percent, index) => (
                      <tr key={percent}>
                        <td>{percent}%</td>
                        {[...Array(6).keys()].map(i => (
                          <td key={i}
                              style={{ backgroundColor: (index % 2 === 0 ? '#e0f7fa' : '#ffffff') }}>
                            {calculateSkill(selectedCharacter['Skill 2'].base, selectedCharacter['Skill 2'].reductions, parseFloat(percent))}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {activeTab === 'Ultimate' && selectedCharacter['Ult'] && (
                <table>
                  <thead>
                    <tr>
                      <th>%</th>
                      <th>1</th>
                      <th>2</th>
                      <th>3</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(selectedCharacter['Ult'].reductions).map((percent, index) => (
                      <tr key={percent}>
                        <td>{percent}%</td>
                        {selectedCharacter['Ult'].reductions[percent].map((value, i) => (
                          <td key={i}
                              style={{ backgroundColor: (i % 2 === 0 ? '#e0f7fa' : '#ffffff') }}>
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </main>
    );
  }