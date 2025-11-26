"use client";

import { useState, useEffect } from "react";
import { Plus, Save, Trash2, Eye, Lock, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { MenuItem, MenuCategoryType } from "@/types/menu";

// Simple password - in production, use proper authentication
const ADMIN_PASSWORD = "smashburgers2024";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [menuData, setMenuData] = useState<{
    burgers: MenuItem[];
    chicken: MenuItem[];
    reubens: MenuItem[];
    sides: MenuItem[];
  } | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoryType>("burgers");
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load menu data
  useEffect(() => {
    if (isAuthenticated) {
      fetch("/data/menu-items.json")
        .then((res) => res.json())
        .then((data) => setMenuData(data))
        .catch((err) => setError("Failed to load menu data: " + err.message));
    }
  }, [isAuthenticated]);

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    setMenuData(null);
  };

  // Create new item template
  const createNewItem = (): MenuItem => ({
    id: "",
    name: "",
    description: "",
    price: "",
    category: selectedCategory,
    imagePath: "/images/",
    featured: false,
  });

  // Handle edit
  const handleEdit = (item: MenuItem) => {
    setEditingItem({ ...item });
    setError("");
    setSuccess("");
  };

  // Handle new item
  const handleNew = () => {
    setEditingItem(createNewItem());
    setError("");
    setSuccess("");
  };

  // Handle save
  const handleSave = () => {
    if (!editingItem || !menuData) return;

    // Validation
    const errors: string[] = [];

    if (!editingItem.id.match(/^[a-z0-9]+(-[a-z0-9]+)*$/)) {
      errors.push("ID must be lowercase letters, numbers, and hyphens only");
    }
    if (!editingItem.name || editingItem.name.length > 100) {
      errors.push("Name is required and must be 100 characters or less");
    }
    if (
      !editingItem.description ||
      editingItem.description.length < 10 ||
      editingItem.description.length > 200
    ) {
      errors.push("Description must be 10-200 characters");
    }
    if (!editingItem.price.match(/^[0-9]+\.[0-9]{2}$/)) {
      errors.push('Price must be in format XX.XX (e.g., "10.99")');
    }
    if (!editingItem.imagePath.startsWith("/images/")) {
      errors.push('Image path must start with "/images/"');
    }

    if (errors.length > 0) {
      setError(errors.join("; "));
      return;
    }

    // Update menu data
    const newData = { ...menuData };
    const category = editingItem.category;
    const existingIndex = newData[category].findIndex(
      (item) => item.id === editingItem.id
    );

    if (existingIndex >= 0) {
      newData[category][existingIndex] = editingItem;
    } else {
      newData[category].push(editingItem);
    }

    setMenuData(newData);
    setSuccess("Item saved! (Note: This is a preview only. In production, this would save to the server.)");
    setEditingItem(null);
  };

  // Handle delete
  const handleDelete = (id: string) => {
    if (!menuData) return;
    if (!confirm("Are you sure you want to delete this item?")) return;

    const newData = { ...menuData };
    newData[selectedCategory] = newData[selectedCategory].filter(
      (item) => item.id !== id
    );

    setMenuData(newData);
    setSuccess("Item deleted! (Note: This is a preview only.)");
  };

  // Handle export
  const handleExport = () => {
    if (!menuData) return;

    const dataStr = JSON.stringify(menuData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "menu-items.json";
    link.click();

    setSuccess("Menu data exported! Upload this file to data/menu-items.json");
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <div className="w-full max-w-md p-8 bg-dark-surface rounded-lg border border-glass-border">
          <div className="flex items-center justify-center mb-6">
            <Lock className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-6">
            Admin Panel
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-dark-bg border border-glass-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white"
                placeholder="Enter admin password"
              />
            </div>
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary-deep rounded-lg font-semibold transition-colors"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-sm text-white/40 text-center">
            Default password: smashburgers2024
          </p>
        </div>
      </div>
    );
  }

  // Admin panel
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-dark-surface border-b border-glass-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Menu Admin Panel</h1>
          <div className="flex gap-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                showPreview
                  ? "bg-primary text-white"
                  : "bg-dark-bg text-white/60 hover:text-white"
              )}
            >
              <Eye className="h-4 w-4" />
              Preview
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary hover:bg-primary/30 rounded-lg transition-colors"
            >
              <Save className="h-4 w-4" />
              Export JSON
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-dark-bg hover:bg-dark-bg/80 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400">
            {success}
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex gap-2 mb-6">
          {(["burgers", "chicken", "reubens", "sides"] as MenuCategoryType[]).map(
            (category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-6 py-3 rounded-lg font-semibold capitalize transition-colors",
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-dark-surface text-white/60 hover:text-white"
                )}
              >
                {category}
              </button>
            )
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Items List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold capitalize">
                {selectedCategory} ({menuData?.[selectedCategory]?.length || 0})
              </h2>
              <button
                onClick={handleNew}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-deep rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add New
              </button>
            </div>

            <div className="space-y-3">
              {menuData?.[selectedCategory]?.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-dark-surface border border-glass-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-sm text-white/60 mt-1">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-primary font-bold">
                          ${item.price}
                        </span>
                        <span className="text-xs text-white/40">
                          ID: {item.id}
                        </span>
                        {item.featured && (
                          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="px-3 py-1 bg-primary/20 text-primary hover:bg-primary/30 rounded text-sm transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded text-sm transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Edit Form */}
          <div>
            {editingItem ? (
              <div className="sticky top-24 bg-dark-surface border border-glass-border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">
                  {editingItem.id ? "Edit Item" : "New Item"}
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      ID (lowercase, hyphens only)
                    </label>
                    <input
                      type="text"
                      value={editingItem.id}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, id: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-dark-bg border border-glass-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white"
                      placeholder="classic-smash"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editingItem.name}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, name: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-dark-bg border border-glass-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white"
                      placeholder="The Classic Smash"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description (10-200 chars)
                    </label>
                    <textarea
                      value={editingItem.description}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-4 py-2 bg-dark-bg border border-glass-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white"
                      placeholder="A juicy smashed patty..."
                    />
                    <p className="text-xs text-white/40 mt-1">
                      {editingItem.description.length} characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Price (no $ symbol)
                    </label>
                    <input
                      type="text"
                      value={editingItem.price}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, price: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-dark-bg border border-glass-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white"
                      placeholder="10.99"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Category
                    </label>
                    <select
                      value={editingItem.category}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          category: e.target.value as MenuCategoryType,
                        })
                      }
                      className="w-full px-4 py-2 bg-dark-bg border border-glass-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white"
                    >
                      <option value="burgers">Burgers</option>
                      <option value="chicken">Chicken</option>
                      <option value="reubens">Reubens</option>
                      <option value="sides">Sides</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Image Path
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingItem.imagePath}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            imagePath: e.target.value,
                          })
                        }
                        className="flex-1 px-4 py-2 bg-dark-bg border border-glass-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white"
                        placeholder="/images/item.jpg"
                      />
                      <button className="px-4 py-2 bg-dark-bg border border-glass-border rounded-lg hover:bg-dark-bg/80 transition-colors">
                        <ImageIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={editingItem.featured}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          featured: e.target.checked,
                        })
                      }
                      className="w-4 h-4"
                    />
                    <label htmlFor="featured" className="text-sm font-medium">
                      Featured Item
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSave}
                      className="flex-1 py-3 bg-primary hover:bg-primary-deep rounded-lg font-semibold transition-colors"
                    >
                      Save Item
                    </button>
                    <button
                      onClick={() => setEditingItem(null)}
                      className="px-6 py-3 bg-dark-bg hover:bg-dark-bg/80 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="sticky top-24 bg-dark-surface border border-glass-border rounded-lg p-6 text-center text-white/40">
                <p>Select an item to edit or click "Add New" to create one</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
