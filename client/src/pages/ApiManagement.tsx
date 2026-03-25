import { useState, useEffect } from "react";
import { Key, Copy, Plus, Trash2, Eye, EyeOff, Check, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ApiKey {
  id: string;
  name: string;
  key_value: string;
  created_at: string;
  last_used: string;
}

const ApiManagement = () => {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newKeyName, setNewKeyName] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => { fetchKeys(); }, []);

  const fetchKeys = async () => {
    try {
      const res = await fetch(`${API_BASE}/api-keys`);
      const data = await res.json();
      setKeys(data);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Backend unreachable." });
    } finally { setLoading(false); }
  };

  const toggleShow = (id: string) => setShowKey(prev => ({ ...prev, [id]: !prev[id] }));

  const copyKey = (id: string, key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({ title: "Copied!", description: "Key copied." });
  };

  const createKey = async () => {
    if (!newKeyName.trim()) return;
    setIsCreating(true);
    try {
      const res = await fetch(`${API_BASE}/api-keys`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newKeyName }),
      });
      const newKey = await res.json();
      setKeys([newKey, ...keys]);
      setNewKeyName("");
      setShowCreate(false);
    } finally { setIsCreating(false); }
  };

  const deleteKey = async (id: string) => {
    await fetch(`${API_BASE}/api-keys/${id}`, { method: "DELETE" });
    setKeys(prev => prev.filter(k => k.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header - Super Bold & Visible */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">API Management</h1>
          <p className="text-slate-400 mt-1">Generate and manage your production access keys.</p>
        </div>
        <Button variant="gradient" onClick={() => setShowCreate(true)} className="h-11 px-6 font-bold shadow-xl">
          <Plus className="h-5 w-5 mr-2" /> Generate New Key
        </Button>
      </div>

      {/* Create Key - Solid Box */}
      {showCreate && (
        <div className="bg-[#0f1115] border-2 border-accent/30 rounded-xl p-6 shadow-2xl">
          <h3 className="text-white font-bold mb-4">Assign a name for the new key</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input 
              placeholder="e.g. Production-Main" 
              value={newKeyName} 
              onChange={e => setNewKeyName(e.target.value)} 
              className="bg-black border-white/20 text-white h-11 focus:ring-2 focus:ring-accent"
            />
            <div className="flex gap-2">
              <Button variant="gradient" onClick={createKey} disabled={isCreating} className="font-bold">
                {isCreating ? <Loader2 className="animate-spin" /> : "Confirm"}
              </Button>
              <Button variant="outline" onClick={() => setShowCreate(false)} className="border-white/20 text-white">Cancel</Button>
            </div>
          </div>
        </div>
      )}

      {/* API Keys List - High Contrast */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="h-10 w-10 animate-spin text-accent" /></div>
        ) : keys.length === 0 ? (
          <div className="bg-[#0f1115] border border-dashed border-white/10 rounded-xl p-16 text-center text-slate-500">
            No keys available.
          </div>
        ) : (
          keys.map(apiKey => (
            <div key={apiKey.id} className="bg-[#0f1115] border border-white/10 rounded-xl p-6 hover:border-white/30 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <Key className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{apiKey.name}</h4>
                    <p className="text-sm text-slate-500 font-mono uppercase tracking-tighter">
                      ID: {apiKey.id.slice(0, 8)}... | Created: {new Date(apiKey.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => toggleShow(apiKey.id)} className="border-white/10 text-white hover:bg-white/5">
                    {showKey[apiKey.id] ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                    {showKey[apiKey.id] ? "Hide" : "Show"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => copyKey(apiKey.id, apiKey.key_value)} className="border-white/10 text-white hover:bg-white/5">
                    {copiedId === apiKey.id ? <Check className="h-4 w-4 mr-2 text-green-400" /> : <Copy className="h-4 w-4 mr-2" />}
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => deleteKey(apiKey.id)} className="border-white/10 text-red-500 hover:bg-red-500/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4 bg-black border border-white/5 rounded-lg p-4 font-mono text-accent break-all select-all">
                {showKey[apiKey.id] ? apiKey.key_value : "••••••••••••••••••••••••••••••••••••••••••••"}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Docs - Solid Section */}
      <div className="bg-[#0a0c10] border border-white/10 rounded-xl p-6 shadow-inner">
        <h3 className="text-white font-bold mb-4 text-lg">Documentation Quick-Access</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-black p-4 rounded-lg border border-white/5">
            <span className="text-slate-500 block mb-1 uppercase text-[10px] font-bold">API Endpoint</span>
            <code className="text-white">https://api.docsift.ai/v1/analyze</code>
          </div>
          <div className="bg-black p-4 rounded-lg border border-white/5">
            <span className="text-slate-500 block mb-1 uppercase text-[10px] font-bold">Authentication</span>
            <code className="text-white">Bearer YOUR_KEY_HERE</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiManagement;