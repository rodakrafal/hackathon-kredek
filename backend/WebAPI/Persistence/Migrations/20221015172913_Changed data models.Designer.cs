﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

#nullable disable

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20221015172913_Changed data models")]
    partial class Changeddatamodels
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.9");

            modelBuilder.Entity("Domain.Models.Area", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Areas");
                });

            modelBuilder.Entity("Domain.Models.Category", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Usage")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Domain.Models.ElectricalAppliance", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<int>("Amount")
                        .HasColumnType("INTEGER");

                    b.Property<Guid>("CategoryId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("ElectricityUsageRecordId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("ElectricityUsageRecordId");

                    b.ToTable("ElectricalAppliances");
                });

            modelBuilder.Entity("Domain.Models.ElectricityUsageRecord", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("AreaId")
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("CategoryId")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<int>("XPosition")
                        .HasColumnType("INTEGER");

                    b.Property<int>("YPosition")
                        .HasColumnType("INTEGER");

                    b.Property<int>("YearlyUsage")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("AreaId");

                    b.HasIndex("CategoryId");

                    b.ToTable("ElectricityUsageRecords");
                });

            modelBuilder.Entity("Domain.Models.Point", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("AreaId")
                        .HasColumnType("TEXT");

                    b.Property<int>("XPosition")
                        .HasColumnType("INTEGER");

                    b.Property<int>("YPosition")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("AreaId");

                    b.ToTable("Points");
                });

            modelBuilder.Entity("Domain.Models.ElectricalAppliance", b =>
                {
                    b.HasOne("Domain.Models.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Models.ElectricityUsageRecord", "ElectricityUsageRecord")
                        .WithMany("ElectricalAppliances")
                        .HasForeignKey("ElectricityUsageRecordId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("ElectricityUsageRecord");
                });

            modelBuilder.Entity("Domain.Models.ElectricityUsageRecord", b =>
                {
                    b.HasOne("Domain.Models.Area", "Area")
                        .WithMany("ElectricityUsagesRecords")
                        .HasForeignKey("AreaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Models.Category", null)
                        .WithMany("ElectricityUsageRecords")
                        .HasForeignKey("CategoryId");

                    b.Navigation("Area");
                });

            modelBuilder.Entity("Domain.Models.Point", b =>
                {
                    b.HasOne("Domain.Models.Area", "Area")
                        .WithMany("Points")
                        .HasForeignKey("AreaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Area");
                });

            modelBuilder.Entity("Domain.Models.Area", b =>
                {
                    b.Navigation("ElectricityUsagesRecords");

                    b.Navigation("Points");
                });

            modelBuilder.Entity("Domain.Models.Category", b =>
                {
                    b.Navigation("ElectricityUsageRecords");
                });

            modelBuilder.Entity("Domain.Models.ElectricityUsageRecord", b =>
                {
                    b.Navigation("ElectricalAppliances");
                });
#pragma warning restore 612, 618
        }
    }
}
