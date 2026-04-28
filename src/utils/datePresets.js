// /**
//  * Date Presets Logic Utility
//  * Purpose: Calculates Start and End dates for various reporting periods.
//  * Standard: Follows Canadian/English reporting formats.
//  */

// export const getPresetDates = (preset) => {
//     const today = new Date();
//     let startDate = new Date();
//     // End date is usually today for all reports
//     const endDate = today.toISOString().split('T')[0]; 

//     switch (preset) {
//         case 'daily':
//             // Start date is same as end date
//             startDate = today;
//             break;
            
//         case 'weekly':
//             // Go back 7 days
//             startDate.setDate(today.getDate() - 7);
//             break;
            
//         case 'monthly':
//             // Go back 1 month
//             startDate.setMonth(today.getMonth() - 1);
//             break;
            
//         case '3months':
//             // Go back 3 months
//             startDate.setMonth(today.getMonth() - 3);
//             break;
            
//         case '6months':
//             // Go back 6 months
//             startDate.setMonth(today.getMonth() - 6);
//             break;
            
//         case 'yearly':
//             // Go back 1 full year
//             startDate.setFullYear(today.getFullYear() - 1);
//             break;

//         default:
//             startDate = today;
//     }

//     return {
//         startDate: startDate.toISOString().split('T')[0],
//         endDate: endDate
//     };
// };









/**
 * Date Presets Logic Utility ✅
 * Purpose: Calculates Start and End dates for reporting.
 * Fix: Replaced toISOString() with Local Date extraction to prevent timezone-based date shifting. ✅
 */

// --- INTERNAL HELPER: Local Date Formatter (YYYY-MM-DD) ---
const formatLocal = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const getPresetDates = (preset) => {
    const today = new Date();
    let startDate = new Date();
    
    // End date is ALWAYS today's local date ✅
    const endDate = formatLocal(today); 

    switch (preset) {
        case 'daily':
            // Start and End are the same day
            startDate = today;
            break;
            
        case 'weekly':
            // Go back 7 days from today
            startDate.setDate(today.getDate() - 7);
            break;
            
        case 'monthly':
            // Go back 1 month from today
            startDate.setMonth(today.getMonth() - 1);
            break;
            
        case '3months':
            // Go back 3 months
            startDate.setMonth(today.getMonth() - 3);
            break;
            
        case '6months':
            // Go back 6 months
            startDate.setMonth(today.getMonth() - 6);
            break;
            
        case 'yearly':
            // Go back 1 full year
            startDate.setFullYear(today.getFullYear() - 1);
            break;

        default:
            startDate = today;
    }

    return {
        startDate: formatLocal(startDate),
        endDate: endDate
    };
};