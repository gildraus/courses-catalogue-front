import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  fallbackLng: "cyr",
  lng: "cyr", // Set default language to 'cyr'
  resources: {
    en: {
      translation: {
        course_catalogue: "COURSE CATALOGUE",
        course_catalogue_footer: "Course catalogue",
        university: "UNIVERSITY OF BELGRADE",
        faculty_navbar: "FACULTY OF ORGANIZATIONAL SCIENCES",
        faculty_footer: "Faculty of оrganizational sciences",
        searchbar_text:
          "Search courses by name, tag, department name or other...",
        filters: "Filters",
        reset_filters: "Reset filters",
        sort: "Sort courses",
        sort_a_to_z: "Sort by name in ascending order",
        sort_z_to_a: "Sort by name in descending order",
        semester: "Semester",
        winter_semester: "Winter",
        summer_semester: "Summer",
        year_of_study: "Year of study",
        first_year: "First",
        second_year: "Second",
        third_year: "Third",
        fourth_year: "Fourth",
        course_404: "Courses not found!",
        course_404_try_again: "Try searching with other parameters.",
        info_box_title: "Course card",
        espb: "ESPB",
        status: "Status",
        level_of_study: "Level of study",
        tags: "Tags",
        departments: "Departments in charge of the course",
        restrictions: "Restrictions",
        website: "Web site",
        basic_info_title: "Basic infomations",
        lecturers: "Lecturers",
        lecture_session_times: "Lecture sessions",
        lecture_session_times_availability:
          "Informations about lecture session times are not currently available",
        exercise_session_times: "Exercise sessions",
        exercise_session_times_availability:
          "Informations about exercise session times are not currently available",
        categorization: "Categorization",
        programs: "Programs",
        modules: "Modules",
        more_info: "More infomations",
        description: "Description",
        literature: "Literature",
        choose_program: "Choose program",
        choose_module: "Choose module",
        num_table: "Num.",
        date_place_time: "date-place-time",
        programs_sidebar: "Programs",
      },
    },
    lat: {
      translation: {
        course_catalogue: "KATALOG PREDMETA",
        course_catalogue_footer: "Katalog predmeta",
        university: "UNIVERZITET U BEOGRADU",
        faculty_navbar: "FAKULTET ORGANIZACIONIH NAUKA",
        faculty_footer: "Fakultet оrganizacionih нauka",
        searchbar_text: "Pretražite kurseve po nazivu, tagu, katedri...",
        filters: "Filteri",
        reset_filters: "Resetuj filtere",
        sort: "Sortiraj kurseve",
        sort_a_to_z: "Sortiraj po nazivu rastuće",
        sort_z_to_a: "Sortiraj po nazivu opadajuće",
        semester: "Semestar",
        winter_semester: "Zimski",
        summer_semester: "Letnji",
        year_of_study: "Godina studija",
        first_year: "Prva",
        second_year: "Druga",
        third_year: "Treća",
        fourth_year: "Četvrta",
        course_404: "Nije pronađen nijedan kurs!",
        course_404_try_again: "Probajte da pretražite po drugim parametrima.",
        info_box_title: "Karton predmeta",
        espb: "Broj ESPB poena",
        status: "Status",
        level_of_study: "Nivo studija",
        tags: "Tagovi",
        departments: "Katedre zadužene za izvođenje predmeta",
        restrictions: "Ograničenja",
        website: "Veb sajt",
        basic_info_title: "Osnovne informacije",
        lecturers: "Predavači",
        lecture_session_times: "Termini predavanja",
        lecture_session_times_availability:
          "Podaci o predavanjima nisu dostupni",
        exercise_session_times: "Termini vežbi",
        exercise_session_times_availability: "Podaci o vežbama nisu dostupni",
        categorization: "Kategorizacija",
        programs: "Programi",
        modules: "Moduli",
        more_info: "Opširnije informacije",
        description: "Opis",
        literature: "Literatura",
        choose_program: "Izaberi program",
        choose_module: "Izaberi modul",
        num_table: "Rb.",
        date_place_time: "datum-mesto-vreme",
        programs_sidebar: "Studijski programi",
      },
    },
    cyr: {
      translation: {
        course_catalogue: "КАТАЛОГ ПРЕДМЕТА",
        course_catalogue_footer: "Каталог предмета",
        university: "УНИВЕРЗИТЕТ У БЕОГРАДУ",
        faculty_navbar: "ФАКУЛТЕТ ОРГАНИЗАЦИОНИХ НАУКА",
        faculty_footer: "Факултет организационих наука",
        searchbar_text: "Претражите курсеве по називу, тагу, катедри...",
        filters: "Филтери",
        reset_filters: "Ресетуј филтере",
        sort: "Сортирај курсеве",
        sort_a_to_z: "Сортирај по називу растуће",
        sort_z_to_a: "Сортирај по називу опадајуће",
        semester: "Семестар",
        winter_semester: "Зимски",
        summer_semester: "Летњи",
        year_of_study: "Година студија",
        first_year: "Прва",
        second_year: "Друга",
        third_year: "Трећа",
        fourth_year: "Четврта",
        course_404: "Није пронађен ниједан курс!",
        course_404_try_again: "Пробајте да претражите по другим параметрима.",
        info_box_title: "Картон предмета",
        espb: "Број ЕСПБ поена",
        status: "Статус",
        level_of_study: "Ниво студија",
        tags: "Тагови",
        departments: "Катедре задужене за извођење предмета",
        restrictions: "Ограничења",
        website: "Веб сајт",
        basic_info_title: "Основне информације",
        lecturers: "Предавачи",
        lecture_session_times: "Термини предавања",
        lecture_session_times_availability:
          "Подаци о предавањима нису доступни",
        exercise_session_times: "Термини вежби",
        exercise_session_times_availability: "Подаци о вежбама нису доступни",
        categorization: "Категоризација",
        programs: "Програми",
        modules: "Модули",
        more_info: "Опширније информације",
        description: "Опис",
        literature: "Литература",
        choose_program: "Изабери прорам",
        choose_module: "Изабери модул",
        num_table: "Рб.",
        date_place_time: "датум-место-време",
        programs_sidebar: "Студијски програми",
    
      },
    },
  },
  detection: {
    order: [],
    caches: [],
  },
});
