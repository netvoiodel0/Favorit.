document.addEventListener('DOMContentLoaded', () => {
    const months = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];
    
    // --- ОБНОВЛЕННЫЙ СПИСОК ПРАЗДНИКОВ С ПОЛНЫМИ НАЗВАНИЯМИ ---
    const knownHolidays = [
        // Январь (0)
        { month: 0, day: 7, name: "🇰🇿🇷🇺🇧🇾🇲🇩 Православное Рождество" }, 
        { month: 0, day: 6, name: "🇧🇾 Колядки (традиционный праздник)" }, 
        
        // Февраль (1)
        { month: 1, day: 13, name: "🇦🇲 Трндез (праздник огня и очищения)" }, 
        
        // Март (2)
        { month: 2, day: 1, name: "🇰🇿 День благодарности" },
        { month: 2, day: 1, name: "🇲🇩 Мэрцишор" },
        { month: 2, day: 20, name: "🇦🇿 Новруз байрамы (1/2)" },
        { month: 2, day: 21, name: "🇦🇿 Новруз байрамы (2/2)" },
        { month: 2, day: 21, name: "🇺🇿🇹🇯🇹🇲🇰🇬 Навруз / Национальный праздник весны" },
        { month: 2, day: 21, name: "🇰🇿 Наурыз мейрамы (1/3)" },
        { month: 2, day: 22, name: "🇰🇿 Наурыз мейрамы (2/3)" },
        { month: 2, day: 23, name: "🇰🇿 Наурыз мейрамы (3/3)" },

        // Май (4)
        { month: 4, day: 1, name: "🇰🇿 День единства народа Казахстана" },
        { month: 4, day: 4, name: "🇰🇬 День эпоса «Манас»" },
        { month: 4, day: 9, name: "🇺🇿 День памяти и почестей (культурно-историческая память)" },
        { month: 4, day: 18, name: "🇹🇲 День туркменской поэзии (Махтумкули)" },
        { month: 4, day: 24, name: "🇷🇺🇧🇾 День славянской письменности и культуры" },

        // Июнь (5)
        { month: 5, day: 4, name: "🇰🇿 День государственных символов" },
        { month: 5, day: 6, name: "🇰🇿🇺🇿🇹🇯🇹🇲🇰🇬 Курбан айт / Курбан хайит / Иди Курбон (Условно фиксировано)" }, // Дата меняется
        { month: 5, day: 21, name: "🇲🇩 День народной музыки" },
        { month: 5, day: 27, name: "🇹🇲 День музыки и культуры" },

        // Июль (6)
        { month: 6, day: 6, name: "🇷🇺🇧🇾 Иван Купала / Купалье (ночь 6–7 июля)" },
        { month: 6, day: 7, name: "🇷🇺🇧🇾 Иван Купала / Купалье (ночь 6–7 июля)" },

        // Август (7)
        { month: 7, day: 10, name: "🇰🇿 День Абая" },
        { month: 7, day: 31, name: "🇰🇬 День кыргызской государственности" },
        { month: 7, day: 31, name: "🇲🇩 День языка" },

        // Сентябрь (8)
        { month: 8, day: 1, name: "🇹🇯 День знаний и культуры" },
        { month: 8, day: 5, name: "🇰🇿 День языков народа Казахстана" },
        { month: 8, day: 18, name: "🇦🇿 День национальной музыки (мугам)" },
        { month: 8, day: 23, name: "🇰🇬 День кыргызского языка" },

        // Октябрь (9)
        { month: 9, day: 1, name: "🇺🇿 День литературы и культуры" },
        { month: 9, day: 13, name: "🇦🇲 День армянского языка и буквы" },
        { month: 9, day: 15, name: "🇦🇲 День армянской культуры" },
        { month: 9, day: 18, name: "🇦🇿 День азербайджанской культуры" },
        
        // Декабрь (11)
        { month: 11, day: 31, name: "🇰🇿🇺🇿🇹🇯🇹🇲🇰🇬🇷🇺🇧🇾🇦🇲🇲🇩 Новый год" },
    ];
    // ----------------------------------------

    const currentMonthYearEl = document.getElementById('currentMonthYear');
    const daysGridEl = document.getElementById('daysGrid');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    function renderCalendar() {
        daysGridEl.innerHTML = '';
        currentMonthYearEl.textContent = `${months[currentMonth]} ${currentYear}`;

        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0); 
        const numDays = lastDayOfMonth.getDate();
        
        let startDayOfWeek = firstDayOfMonth.getDay();
        if (startDayOfWeek === 0) {
            startDayOfWeek = 7; 
        }
        let paddingDays = startDayOfWeek - 1; 

        for (let i = 0; i < paddingDays; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('day-cell');
            daysGridEl.appendChild(emptyCell);
        }

        const today = new Date();
        const todayDate = today.getDate();
        const todayMonth = today.getMonth();
        const todayYear = today.getFullYear();
        
        for (let day = 1; day <= numDays; day++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('day-cell');

            // 1. Создаем div для номера дня
            const dayNumber = document.createElement('div');
            dayNumber.classList.add('day-number');
            dayNumber.textContent = day;
            dayCell.appendChild(dayNumber);

            if (day === todayDate && currentMonth === todayMonth && currentYear === todayYear) {
                dayCell.classList.add('current-day');
            }
            
            // 2. Находим все праздники на этот день
            const holidays = knownHolidays.filter(h => h.month === currentMonth && h.day === day);
            
            if (holidays.length > 0) {
                dayCell.classList.add('holiday');
                
                // 3. Создаем контейнер для названий праздников
                const holidayInfo = document.createElement('div');
                holidayInfo.classList.add('holiday-info');
                
                // Объединяем флаги и полные названия, разделяя их переносом строки
                const holidayText = holidays.map(h => h.name).join('<br>');
                
                // Вставляем HTML (с <br>)
                holidayInfo.innerHTML = holidayText;
                dayCell.appendChild(holidayInfo);
                
                // 4. Добавляем всплывающее окно с полным списком
                const fullNames = holidays.map(h => h.name).join('\n');
                dayCell.onclick = () => alert(`Праздник(и) на ${day} ${months[currentMonth]}:\n\n${fullNames}`);
            }

            daysGridEl.appendChild(dayCell);
        }
    }

    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    renderCalendar();
});