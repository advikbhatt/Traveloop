"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useParams } from "next/navigation";

export default function BudgetScreen() {
  const params = useParams();

  // Mock data
  const totalBudget = 2500;
  const expenses = {
    Transport: 800,
    Accommodation: 1000,
    Activities: 400,
    Food: 300,
  };
  
  const totalSpent = Object.values(expenses).reduce((a, b) => a + b, 0);
  const remaining = totalBudget - totalSpent;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href={`/trips/${params.id}/build`} className={styles.backLink}>← Back to Builder</Link>
          <h1 className="gradient-text">Budget & Costs</h1>
        </div>
      </header>

      <div className={styles.grid}>
        {/* Overview Card */}
        <div className={`glass-panel ${styles.overviewCard}`}>
          <h2>Total Budget Overview</h2>
          <div className={styles.budgetDisplay}>
            <div className={styles.budgetItem}>
              <span className={styles.label}>Total Budget</span>
              <span className={styles.value}>${totalBudget}</span>
            </div>
            <div className={styles.budgetItem}>
              <span className={styles.label}>Estimated Cost</span>
              <span className={styles.value}>${totalSpent}</span>
            </div>
            <div className={`${styles.budgetItem} ${remaining >= 0 ? styles.positive : styles.negative}`}>
              <span className={styles.label}>Remaining</span>
              <span className={styles.value}>${remaining}</span>
            </div>
          </div>
          
          <div className={styles.progressBarBg}>
            <div 
              className={styles.progressBarFill} 
              style={{ width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%`, backgroundColor: remaining >= 0 ? 'var(--accent-primary)' : 'var(--error)' }}
            />
          </div>
        </div>

        {/* Breakdown Card */}
        <div className={`glass-panel ${styles.breakdownCard}`}>
          <h2>Cost Breakdown</h2>
          <ul className={styles.expenseList}>
            {Object.entries(expenses).map(([category, amount]) => (
              <li key={category} className={styles.expenseItem}>
                <div className={styles.expenseInfo}>
                  <div className={styles.categoryColor} style={{ backgroundColor: getCategoryColor(category) }} />
                  <span>{category}</span>
                </div>
                <span className={styles.expenseAmount}>${amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function getCategoryColor(category: string) {
  switch (category) {
    case 'Transport': return '#007AFF';
    case 'Accommodation': return '#5E5CE6';
    case 'Activities': return '#FF9F0A';
    case 'Food': return '#32D74B';
    default: return '#A0A0A0';
  }
}
