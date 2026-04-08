-- @file 20260408120000_storage_site_assets_rls.sql
-- @description Storage：site-assets bucket 允许指定邮箱登录用户上传/更新/删除对象。

-- 说明：bucket 需先在 Dashboard → Storage 创建，名称为 site-assets。

-- 删除旧策略（若存在，便于重复执行）
drop policy if exists "site_assets_insert_owner" on storage.objects;
drop policy if exists "site_assets_update_owner" on storage.objects;
drop policy if exists "site_assets_delete_owner" on storage.objects;

-- 仅允许该邮箱（与站点后台管理员一致）写入 site-assets
create policy "site_assets_insert_owner"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'site-assets'
    and (auth.jwt() ->> 'email') = '1743110041@qq.com'
  );

create policy "site_assets_update_owner"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'site-assets'
    and (auth.jwt() ->> 'email') = '1743110041@qq.com'
  )
  with check (
    bucket_id = 'site-assets'
    and (auth.jwt() ->> 'email') = '1743110041@qq.com'
  );

create policy "site_assets_delete_owner"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'site-assets'
    and (auth.jwt() ->> 'email') = '1743110041@qq.com'
  );
