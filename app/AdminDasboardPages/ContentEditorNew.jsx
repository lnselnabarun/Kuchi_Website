"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, Eye, EyeOff, Bold, Italic, List, Link, Code } from "lucide-react";

const ContentEditor = ({ contentType, onBack }) => {
  const [content, setContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Title by content type
  const getTitle = () => {
    switch (contentType) {
      case "about-us":
        return "About Us";
      case "terms-conditions":
        return "Terms & Conditions";
      case "privacy-policy":
        return "Privacy Policy";
      default:
        return "Content Editor";
    }
  };

  useEffect(() => {
    loadContent();
  }, [contentType]);

  const loadContent = async () => {
    try {
      const mockContent = {
        "about-us": "Welcome to Kuchi Jewelry!\n\nWe are a premier jewelry company specializing in exquisite handcrafted pieces...",
        "terms-conditions": "Terms & Conditions\n\n1. General Terms\nThese terms and conditions govern your use of our website...",
        "privacy-policy": "Privacy Policy\n\nYour privacy is important to us. This policy explains how we collect and use your information..."
      };
      setContent(mockContent[contentType] || "");
    } catch (error) {
      console.error("Error loading content:", error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLastSaved(new Date());
      alert("Content saved successfully!");
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Error saving content. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const insertFormatting = (format) => {
    const textarea = document.getElementById("content-editor");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let formattedText = "";

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        break;
      case "list":
        formattedText = `\n- ${selectedText}`;
        break;
      case "link":
        formattedText = `[${selectedText}](url)`;
        break;
      case "code":
        formattedText = `\`${selectedText}\``;
        break;
      default:
        formattedText = selectedText;
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
  };

  // Convert markdown-like syntax to HTML
  const convertToHTML = (text) => {
    let html = text
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/```(.*?)```/gs, "<pre><code>$1</code></pre>")
      .replace(/`(.*?)`/g, "<code>$1</code>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/^\s*[-*+] (.*)$/gim, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/gim, "<ul>$1</ul>")
      .replace(/\n\n+/g, "</p><p>")
      .replace(/\n/g, "<br />");

    if (!html.startsWith("<")) html = "<p>" + html + "</p>";
    return html;
  };

  // Generate compressed one-line HTML
  const getHTMLContent = () => convertToHTML(content).replace(/\s+/g, " ").trim();

  const getHTMLContentWithStyles = () => {
    const htmlContent = getHTMLContent();
    const styledHTML = `
      <!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:1.6;color:#333;padding:16px;margin:0;background-color:#fff;}
        h1{font-size:28px;font-weight:bold;margin:20px 0 16px;color:#1a1a1a;}
        h2{font-size:24px;font-weight:bold;margin:18px 0 14px;color:#2a2a2a;}
        h3{font-size:20px;font-weight:600;margin:16px 0 12px;color:#3a3a3a;}
        p{margin-bottom:12px;}
        strong{font-weight:bold;color:#000;}
        em{font-style:italic;}
        ul{margin-left:20px;margin-bottom:12px;}
        li{margin-bottom:6px;}
        code{background-color:#f4f4f4;padding:2px 6px;border-radius:3px;font-family:'Courier New',Courier,monospace;font-size:14px;}
        pre{background-color:#f4f4f4;padding:12px;border-radius:6px;overflow-x:auto;margin-bottom:12px;}
        pre code{background-color:transparent;padding:0;}
        a{color:#007bff;text-decoration:none;}
        a:hover{text-decoration:underline;}
        blockquote{border-left:4px solid #ddd;margin-left:0;padding-left:16px;color:#666;}
      </style>
      </head><body>${htmlContent}</body></html>
    `;
    return styledHTML.replace(/\s+/g, " ").trim();
  };

  const exportForReactNative = () => {
    const htmlData = {
      html: getHTMLContent(),
      fullHTML: getHTMLContentWithStyles(),
      rawContent: content,
      contentType,
      lastModified: new Date().toISOString(),
    };
    console.log("HTML Data for React Native:", htmlData);
    return htmlData;
  };

  const renderPreview = () => (
    <div dangerouslySetInnerHTML={{ __html: getHTMLContent() }} />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6 mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{getTitle()}</h1>
            <p className="text-gray-600 mt-1">Edit and manage your {getTitle().toLowerCase()} content</p>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
        </div>

        {/* Editor */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              {[["bold", Bold], ["italic", Italic], ["list", List], ["link", Link], ["code", Code]].map(([fmt, Icon]) => (
                <button
                  key={fmt}
                  onClick={() => insertFormatting(fmt)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title={fmt}
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
            >
              {isPreview ? <EyeOff size={18} /> : <Eye size={18} />}
              <span>{isPreview ? "Edit" : "Preview"}</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="min-h-[400px]">
            {isPreview ? (
              <div className="prose max-w-none p-4 bg-gray-50 rounded-lg">{renderPreview()}</div>
            ) : (
              <textarea
                id="content-editor"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[400px] p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                placeholder="Enter your content here..."
              />
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              {lastSaved && <span>Last saved: {lastSaved.toLocaleTimeString()}</span>}
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportForReactNative}
                className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all"
              >
                <Code size={18} />
                <span>Export HTML</span>
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all ${
                  isSaving ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Save size={18} />
                <span>{isSaving ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* One-line HTML Output */}
        {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">One-line HTML Output</h3>
          <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap break-words">
            <code>{getHTMLContent()}</code>
          </pre>
        </div> */}
      </div>
    </div>
  );
};

export default ContentEditor;