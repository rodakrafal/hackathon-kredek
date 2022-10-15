﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IPopulateService
    {
        void PopulateAreas(string dataPath);
        void PopulateCategoriesAndAppliances();

    }
}
