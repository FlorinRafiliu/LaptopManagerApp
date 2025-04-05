
function StatusBanner({isOnline, isServerUp}) {
    if (!isOnline) 
        return <div className="bg-yellow-500 p-2 text-white">⚠️ Offline (Network)</div>;
    if (!isServerUp) 
        return <div className="bg-red-500 p-2 text-white">❌ Server Unreachable</div>;
    return <div className="bg-red-500 p-2 text-white">✅ ONLINE </div>;
}

export default StatusBanner;