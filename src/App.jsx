import React, {useEffect, useState} from 'react';

export default function App() {
    const [usernames, setUsernames] = useState(JSON.parse(localStorage.getItem('usernames')) || ['']);
    const [teamPairs, setTeamPairs] = useState(JSON.parse(localStorage.getItem('teamPairs')) || []);

    useEffect(() => {
        localStorage.setItem('usernames', JSON.stringify(usernames));
        localStorage.setItem('teamPairs', JSON.stringify(teamPairs));
    }, [usernames, teamPairs]);

    const handleAddUsername = () => {
        setUsernames([...usernames, '']);
    };

    const handleUsernameChange = (index, value) => {
        const updatedUsernames = usernames.map((username, i) => i === index ? value : username);
        setUsernames(updatedUsernames);
    };

    const handleRemoveUsername = (index) => {
        const updatedUsernames = usernames.filter((_, i) => i !== index);
        setUsernames(updatedUsernames);
    };

    const createTeamPairs = () => {
        if (usernames.length < 4) {
            alert("At least four people are required to create team pairs.");
            return;
        }

        let shuffledUsers = [...usernames].sort(() => 0.5 - Math.random());
        let teams = [];

        while (shuffledUsers.length >= 2) {
            teams.push([shuffledUsers.shift(), shuffledUsers.shift()]);
        }

        let pairs = [];
        for (let i = 0; i < teams.length; i += 2) {
            const match = {
                team1: teams[i],
                team2: teams[i + 1] || ["No Opponent"]
            };
            pairs.push(match);
        }
        console.log(pairs)
        setTeamPairs(pairs);
    };
    const handleReset = () => {
        setUsernames(['']); // Reset usernames to initial state with one empty string
        setTeamPairs([]); // Clear all team pairings

        // Optionally, also clear data from local storage
        localStorage.removeItem('usernames');
        localStorage.removeItem('teamPairs');
    };
    return (
        <div className="flex justify-center items-center bg-gray-100 min-h-screen p-4">
            <div className="rounded-lg overflow-hidden shadow-xl max-w-2xl w-full bg-white">
                <div className="p-6">
                    {/* Header */}
                    <div className="mb-4">
                        <div className="font-bold text-2xl mb-2 text-gray-800">DEADLY CLAN</div>
                        <p className="text-gray-600 text-base">
                            Add PUBG usernames and create teams.
                        </p>
                    </div>

                    {/* User Input Section */}
                    <div className="overflow-auto max-h-60">
                        {usernames.map((username, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    className="shadow appearance-none border rounded flex-grow py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="Enter Username"
                                    value={username}
                                    onChange={(e) => handleUsernameChange(index, e.target.value)}
                                />
                                {index > 0 && (
                                    <button
                                        onClick={() => handleRemoveUsername(index)}
                                        className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                                    >
                                        X
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center mt-4">
                        <button onClick={handleAddUsername}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                            Add User
                        </button>
                        <button onClick={createTeamPairs}
                                className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ${usernames.length < 4 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            Create Team Pairs
                        </button>
                        <button onClick={handleReset}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                            Reset
                        </button>
                    </div>

                </div>

                {/* Team Pairs Display */}

                <div className="p-6">
                    {teamPairs.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-center mb-6">Team Matchups</h2>
                            <div className="space-y-4">
                                {teamPairs.map((match, index) => (
                                    <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                                        <h3 className="text-lg font-semibold text-blue-600">Match {index + 1}</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                            <div className="flex flex-col items-center justify-center bg-blue-100 p-3 rounded">
                                                <span className="font-medium text-blue-800">Team {index * 2 + 1}</span>
                                                <span className="text-sm text-gray-600">{match.team1.join(', ')}</span>
                                            </div>
                                            {match.team2 && match.team2[0] !== "No Opponent" ? (
                                                <div className="flex flex-col items-center justify-center bg-green-100 p-3 rounded">
                                                    <span className="font-medium text-green-800">Team {index * 2 + 2}</span>
                                                    <span className="text-sm text-gray-600">{match.team2.join(', ')}</span>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center bg-red-100 p-3 rounded">
                                                    <span className="text-sm text-red-500">No Opponent</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>

    );
}

