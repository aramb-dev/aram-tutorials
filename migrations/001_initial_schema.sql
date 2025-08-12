-- Aram Tutorials Database Schema
-- Initial migration to create all required tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(7) NOT NULL DEFAULT '#1e293b',
    icon VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tags table
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    featured_image TEXT,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    is_featured BOOLEAN DEFAULT FALSE,
    reading_time INTEGER DEFAULT 1,
    views INTEGER DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog post tags junction table
CREATE TABLE blog_post_tags (
    post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- Comments table
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    author_name VARCHAR(255) NOT NULL,
    author_email VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter subscriptions table
CREATE TABLE newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Contact submissions table
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_category_id ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_author_id ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_featured ON blog_posts(is_featured);
CREATE INDEX idx_blog_posts_views ON blog_posts(views DESC);

CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_status ON comments(status);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_tags_slug ON tags(slug);

CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX idx_newsletter_status ON newsletter_subscriptions(status);

-- Full-text search indexes
CREATE INDEX idx_blog_posts_search ON blog_posts USING GIN(to_tsvector('english', title || ' ' || excerpt || ' ' || content));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tags_updated_at BEFORE UPDATE ON tags FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial data

-- Insert default author
INSERT INTO users (id, email, name, bio) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'aramtutorials@gmail.com', 'Aram Tutorials Team', 'Passionate tech educators and developers helping people master technology through clear, practical tutorials.');

-- Insert categories
INSERT INTO categories (name, slug, description, color, icon) VALUES 
('Mac', 'mac', 'macOS tutorials, tips, and tricks for Mac users', '#007AFF', 'laptop'),
('Windows', 'windows', 'Windows tutorials, guides, and productivity tips', '#0078D4', 'monitor'),
('Android', 'android', 'Android tutorials, app guides, and mobile tips', '#3DDC84', 'smartphone'),
('VS Code', 'vscode', 'Visual Studio Code tutorials, extensions, and productivity tips', '#007ACC', 'code'),
('Homebrew', 'homebrew', 'Homebrew package manager tutorials and guides', '#FBB040', 'package'),
('Google', 'google', 'Google services, apps, and productivity tutorials', '#4285F4', 'search');

-- Insert some initial tags
INSERT INTO tags (name, slug) VALUES 
('Beginner', 'beginner'),
('Advanced', 'advanced'),
('Tutorial', 'tutorial'),
('Tips', 'tips'),
('Productivity', 'productivity'),
('Setup', 'setup'),
('Configuration', 'configuration'),
('Troubleshooting', 'troubleshooting'),
('Shortcuts', 'shortcuts'),
('Automation', 'automation');

-- Insert sample blog posts
INSERT INTO blog_posts (
    title, 
    slug, 
    excerpt, 
    content, 
    author_id, 
    category_id, 
    status, 
    is_featured, 
    reading_time, 
    published_at
) VALUES 
(
    'Getting Started with Homebrew on macOS',
    'getting-started-homebrew-macos',
    'Learn how to install and use Homebrew, the missing package manager for macOS. This comprehensive guide covers installation, basic commands, and essential packages.',
    '# Getting Started with Homebrew on macOS\n\nHomebrew is a free and open-source software package management system that simplifies the installation of software on Apple''s operating system, macOS, as well as Linux.\n\n## What is Homebrew?\n\nHomebrew installs the stuff you need that Apple (or your Linux system) didn''t. It''s like apt-get or yum for macOS.\n\n## Installation\n\nTo install Homebrew, open Terminal and run:\n\n```bash\n/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"\n```\n\n## Basic Commands\n\nHere are the essential Homebrew commands you need to know:\n\n- `brew install <package>` - Install a package\n- `brew uninstall <package>` - Uninstall a package\n- `brew update` - Update Homebrew\n- `brew upgrade` - Upgrade all packages\n- `brew list` - List installed packages\n\n## Essential Packages\n\nHere are some packages I recommend installing right away:\n\n```bash\nbrew install git\nbrew install node\nbrew install python\nbrew install wget\nbrew install tree\n```\n\n## Conclusion\n\nHomebrew makes managing software on macOS incredibly easy. Start with these basics and explore the thousands of available packages!',
    '550e8400-e29b-41d4-a716-446655440000',
    (SELECT id FROM categories WHERE slug = 'homebrew'),
    'published',
    true,
    5,
    NOW() - INTERVAL '2 days'
),
(
    'Essential VS Code Extensions for Developers',
    'essential-vscode-extensions-developers',
    'Discover the must-have VS Code extensions that will supercharge your development workflow. From productivity boosters to language-specific tools.',
    '# Essential VS Code Extensions for Developers\n\nVisual Studio Code is already a powerful editor, but extensions make it truly exceptional. Here are the extensions I consider essential for any developer.\n\n## Productivity Extensions\n\n### 1. Prettier - Code Formatter\nAutomatically formats your code to ensure consistency across your project.\n\n### 2. GitLens\nSupercharges the Git capabilities built into VS Code. See who changed what and when.\n\n### 3. Auto Rename Tag\nAutomatically renames paired HTML/XML tags.\n\n## Language-Specific Extensions\n\n### JavaScript/TypeScript\n- ES7+ React/Redux/React-Native snippets\n- TypeScript Importer\n- JavaScript (ES6) code snippets\n\n### Python\n- Python\n- Python Docstring Generator\n- Pylance\n\n## Theme and UI\n\n### 1. One Dark Pro\nA beautiful dark theme that''s easy on the eyes.\n\n### 2. Material Icon Theme\nProvides beautiful icons for different file types.\n\n## Installation\n\nTo install any extension:\n1. Open VS Code\n2. Press `Cmd+Shift+X` (Mac) or `Ctrl+Shift+X` (Windows/Linux)\n3. Search for the extension name\n4. Click Install\n\n## Conclusion\n\nThese extensions will significantly improve your development experience. Start with the productivity extensions and add language-specific ones as needed.',
    '550e8400-e29b-41d4-a716-446655440000',
    (SELECT id FROM categories WHERE slug = 'vscode'),
    'published',
    true,
    4,
    NOW() - INTERVAL '1 day'
),
(
    'How to Customize Your Android Home Screen',
    'customize-android-home-screen',
    'Transform your Android device with these customization tips. Learn about launchers, widgets, icon packs, and wallpapers to create your perfect setup.',
    '# How to Customize Your Android Home Screen\n\nOne of Android''s biggest advantages is customization. Here''s how to make your home screen truly yours.\n\n## Choose a Launcher\n\nLaunchers control your home screen experience:\n\n### Nova Launcher\n- Highly customizable\n- Smooth performance\n- Extensive gesture support\n\n### Action Launcher\n- Unique quickdrawer feature\n- Adaptive icons\n- Shutters and covers\n\n## Widgets\n\nWidgets provide at-a-glance information:\n\n- **Weather widgets** - See current conditions\n- **Calendar widgets** - View upcoming events\n- **Music widgets** - Control playback\n- **News widgets** - Stay informed\n\n## Icon Packs\n\nChange your app icons for a cohesive look:\n\n- Linebit - Minimalist line icons\n- Candycons - Colorful and fun\n- Whicons - Clean white icons\n\n## Wallpapers\n\nChoose wallpapers that complement your setup:\n\n- Use solid colors for minimal looks\n- Try gradients for modern feels\n- Live wallpapers for dynamic backgrounds\n\n## Pro Tips\n\n1. **Keep it simple** - Don''t overcrowd your screen\n2. **Use folders** - Organize similar apps\n3. **Hide unused apps** - Keep your drawer clean\n4. **Backup your setup** - Save your configuration\n\n## Conclusion\n\nCustomizing your Android home screen is fun and functional. Experiment with different combinations to find what works for you!',
    '550e8400-e29b-41d4-a716-446655440000',
    (SELECT id FROM categories WHERE slug = 'android'),
    'published',
    false,
    6,
    NOW() - INTERVAL '3 days'
);

-- Link posts with tags
INSERT INTO blog_post_tags (post_id, tag_id)
SELECT 
    bp.id,
    t.id
FROM blog_posts bp, tags t
WHERE 
    (bp.slug = 'getting-started-homebrew-macos' AND t.slug IN ('beginner', 'tutorial', 'setup')) OR
    (bp.slug = 'essential-vscode-extensions-developers' AND t.slug IN ('productivity', 'tutorial', 'configuration')) OR
    (bp.slug = 'customize-android-home-screen' AND t.slug IN ('tutorial', 'tips', 'customization'));

-- Add the missing customization tag
INSERT INTO tags (name, slug) VALUES ('Customization', 'customization')
ON CONFLICT (slug) DO NOTHING;

-- Update the blog_post_tags for the Android post
INSERT INTO blog_post_tags (post_id, tag_id)
SELECT 
    bp.id,
    t.id
FROM blog_posts bp, tags t
WHERE bp.slug = 'customize-android-home-screen' AND t.slug = 'customization'
ON CONFLICT DO NOTHING;