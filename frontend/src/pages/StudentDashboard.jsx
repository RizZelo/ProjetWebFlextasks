import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TASK_CATEGORIES = [
  { id: 'all', name: 'All Tasks', icon: '📋' },
  { id: 'cleaning', name: 'Cleaning', icon: '🧹' },
  { id: 'cooking', name: 'Cooking', icon: '🍳' },
  { id: 'dog-walking', name: 'Dog Walking', icon: '🐕' },
  { id: 'babysitting', name: 'Babysitting', icon: '👶' },
  { id: 'gardening', name: 'Gardening', icon: '🌱' },
  { id: 'tutoring', name: 'Tutoring', icon: '📚' },
  { id: 'errands', name: 'Errands', icon: '🛒' },
  { id: 'other', name: 'Other', icon: '✨' },
];

export default function StudentDashboard() {
  const { user, logout, isStudent } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [appliedTasks, setAppliedTasks] = useState([]);

  useEffect(() => {
    if (!isStudent) {
      navigate('/login');
      return;
    }
    // Load tasks from localStorage
    const storedTasks = JSON.parse(localStorage.getItem('flextasks_tasks') || '[]');
    setTasks(storedTasks.filter(t => t.status === 'open'));
    
    // Load applied tasks
    const applied = JSON.parse(localStorage.getItem('flextasks_applications') || '[]');
    setAppliedTasks(applied.filter(a => a.studentId === user?.id).map(a => a.taskId));
  }, [isStudent, navigate, user?.id]);

  const handleApply = (taskId) => {
    const applications = JSON.parse(localStorage.getItem('flextasks_applications') || '[]');
    const newApplication = {
      id: Date.now().toString(),
      taskId,
      studentId: user.id,
      studentName: user.name,
      appliedAt: new Date().toISOString(),
      status: 'pending',
    };
    applications.push(newApplication);
    localStorage.setItem('flextasks_applications', JSON.stringify(applications));
    setAppliedTasks([...appliedTasks, taskId]);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredTasks = selectedCategory === 'all' 
    ? tasks 
    : tasks.filter(t => t.category === selectedCategory);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <div style={styles.navLeft}>
          <span style={styles.logo}>🎓 FlexTasks</span>
          <span style={styles.roleLabel}>Student Portal</span>
        </div>
        <div style={styles.navRight}>
          <span style={styles.userName}>Hi, {user?.name}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </nav>

      <main style={styles.main}>
        <header style={styles.header}>
          <h1 style={styles.title}>Find Your Next Task</h1>
          <p style={styles.subtitle}>Browse available tasks in your area and start earning</p>
        </header>

        <div style={styles.categories}>
          {TASK_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                ...styles.categoryBtn,
                ...(selectedCategory === cat.id ? styles.categoryBtnActive : {}),
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        <div style={styles.tasksGrid}>
          {filteredTasks.length === 0 ? (
            <div style={styles.emptyState}>
              <span style={styles.emptyIcon}>📭</span>
              <h3 style={styles.emptyTitle}>No tasks available</h3>
              <p style={styles.emptyText}>Check back later for new opportunities!</p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <div key={task.id} style={styles.taskCard}>
                <div style={styles.taskHeader}>
                  <span style={styles.taskCategory}>
                    {TASK_CATEGORIES.find(c => c.id === task.category)?.icon || '📋'}{' '}
                    {TASK_CATEGORIES.find(c => c.id === task.category)?.name || task.category}
                  </span>
                  <span style={styles.taskPrice}>${task.price}</span>
                </div>
                <h3 style={styles.taskTitle}>{task.title}</h3>
                <p style={styles.taskDescription}>{task.description}</p>
                <div style={styles.taskDetails}>
                  <span>📍 {task.location}</span>
                  <span>📅 {formatDate(task.date)}</span>
                  <span>⏰ {task.time}</span>
                </div>
                <div style={styles.taskFooter}>
                  <span style={styles.clientName}>Posted by {task.clientName}</span>
                  {appliedTasks.includes(task.id) ? (
                    <span style={styles.appliedBadge}>✓ Applied</span>
                  ) : (
                    <button
                      onClick={() => handleApply(task.id)}
                      style={styles.applyBtn}
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f5f5f5',
  },
  nav: {
    background: 'white',
    padding: '16px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#d7747e',
  },
  roleLabel: {
    background: '#e8f5e9',
    color: '#2e7d32',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  userName: {
    fontSize: '16px',
    color: '#333',
  },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid #ddd',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '12px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#666',
  },
  categories: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '40px',
  },
  categoryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    borderRadius: '25px',
    border: '1px solid #ddd',
    background: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s',
  },
  categoryBtnActive: {
    background: '#d7747e',
    color: 'white',
    border: '1px solid #d7747e',
  },
  tasksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '24px',
  },
  taskCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  taskHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  taskCategory: {
    background: '#f0f0f0',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '13px',
  },
  taskPrice: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#2e7d32',
  },
  taskTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
  },
  taskDescription: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5',
    marginBottom: '16px',
  },
  taskDetails: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    fontSize: '14px',
    color: '#888',
    marginBottom: '16px',
  },
  taskFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '16px',
    borderTop: '1px solid #eee',
  },
  clientName: {
    fontSize: '13px',
    color: '#888',
  },
  applyBtn: {
    background: '#d7747e',
    color: 'white',
    padding: '10px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
  },
  appliedBadge: {
    background: '#e8f5e9',
    color: '#2e7d32',
    padding: '8px 16px',
    borderRadius: '8px',
    fontWeight: '500',
    fontSize: '14px',
  },
  emptyState: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '60px 20px',
    background: 'white',
    borderRadius: '16px',
  },
  emptyIcon: {
    fontSize: '48px',
    display: 'block',
    marginBottom: '16px',
  },
  emptyTitle: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '8px',
  },
  emptyText: {
    color: '#666',
  },
};
